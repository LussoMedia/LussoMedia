'use client';

import { useState } from 'react';
import { scoreQuestions } from '@/lib/config/score';
import { computeScore, ScoreAnswers } from '@/lib/scoring';
import { trackEvent, getStoredUtms } from '@/lib/analytics';
import { storeScoreLead } from '@/lib/leadStorage';
import ProgressIndicator from '@/components/ProgressIndicator';
import ScoreIntro from './ScoreIntro';
import QuestionStep from './QuestionStep';
import ScoreReveal from './ScoreReveal';
import LeadCaptureForm, { LeadCaptureData } from './LeadCaptureForm';
import ScoreBreakdown from './ScoreBreakdown';

type Stage = 'intro' | 'questions' | 'reveal' | 'capture' | 'breakdown';

export default function ScoreFunnel() {
  const [stage, setStage] = useState<Stage>('intro');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<ScoreAnswers>({});
  const [firstName, setFirstName] = useState('');

  const currentQuestion = scoreQuestions[questionIndex];
  const result = computeScore(answers);

  const start = () => {
    trackEvent('dominance_score_start');
    setStage('questions');
  };

  const answer = (optionIndex: number) => {
    const next = { ...answers, [currentQuestion.id]: optionIndex };
    setAnswers(next);
    trackEvent('dominance_score_question', {
      questionId: currentQuestion.id,
      step: questionIndex + 1,
    });

    if (questionIndex < scoreQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      trackEvent('dominance_score_complete', { overall: computeScore(next).overall });
      setStage('reveal');
    }
  };

  const goBack = () => {
    if (questionIndex > 0) setQuestionIndex(questionIndex - 1);
  };

  const unlock = () => setStage('capture');

  const submitLead = (data: LeadCaptureData) => {
    setFirstName(data.firstName);
    storeScoreLead({ ...data, result });
    trackEvent('dominance_score_lead_capture', { email: data.email, company: data.company });
    setStage('breakdown');

    // Best-effort delivery — never blocks the funnel. Sends raw `answers`
    // rather than the client-computed `result`; the server recomputes the
    // score itself so a tampered request can't fabricate a score.
    const { companyFax, ...leadFields } = data;
    fetch('/api/leads/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...leadFields, answers, companyFax, utm: getStoredUtms() }),
    }).catch((err) => console.error('Score lead submission failed', err));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-32">
      {stage === 'questions' && (
        <ProgressIndicator step={questionIndex + 1} total={scoreQuestions.length} label="Local Dominance Score" />
      )}

      {stage === 'intro' && <ScoreIntro onStart={start} />}

      {stage === 'questions' && (
        <QuestionStep
          key={currentQuestion.id}
          question={currentQuestion}
          selected={answers[currentQuestion.id]}
          onAnswer={answer}
          onBack={questionIndex > 0 ? goBack : undefined}
        />
      )}

      {stage === 'reveal' && <ScoreReveal result={result} onUnlock={unlock} />}

      {stage === 'capture' && <LeadCaptureForm onSubmit={submitLead} />}

      {stage === 'breakdown' && <ScoreBreakdown result={result} firstName={firstName} />}
    </div>
  );
}
