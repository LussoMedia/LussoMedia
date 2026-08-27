import { z } from 'zod';

// Runtime validation for the two public lead-capture endpoints. Anyone can
// call these directly (confirmed during manual testing), so the frontend's
// required-field/format checks in StepForm.tsx and LeadCaptureForm.tsx
// don't count as real enforcement — this is the actual boundary.

const shortText = (max = 200) => z.string().trim().max(max).optional().default('');
const longText = (max = 1000) => z.string().trim().max(max).optional().default('');

// Honeypot: a hidden field real visitors never see or fill. Deliberately
// permissive here (any string, up to a sane cap) so a filled value doesn't
// fail schema validation with a tell-tale 400 — the route handler checks
// it's empty and responds with an ordinary-looking success instead, so a
// scripted bot gets no signal that it was detected.
const honeypot = z.string().max(500).optional().default('');

export const applicationValuesSchema = z.object({
  contactName: shortText(120),
  email: z.string().trim().email().max(200),
  phone: shortText(40),
  companyName: z.string().trim().min(1).max(150),
  website: shortText(300),
  industry: shortText(80),
  serviceArea: shortText(150),
  monthlyRevenue: shortText(80),
  primaryServiceToGrow: shortText(200),
  avgJobValue: shortText(80),
  grossMargin: shortText(80),
  teamSize: shortText(80),
  primarySource: shortText(80),
  monthlyLeadVolume: shortText(80),
  currentMediaSpend: shortText(80),
  websiteStatus: shortText(80),
  leadFollowUp: shortText(80),
  capacity: shortText(80),
  growthConstraint: longText(1000),
  ninetyDayGoal: longText(1000),
  startTimeframe: shortText(80),
  investmentReadiness: shortText(120),
});

// Part 17 — abandonment recovery. Fired once contact info is captured
// (end of step 1) but before final submission, so a contact who never
// finishes can still be recovered. Deliberately minimal — only what's
// needed to identify and greet them.
export const applicationStartSchema = z.object({
  contactName: shortText(120),
  email: z.string().trim().email().max(200),
  companyName: z.string().trim().min(1).max(150),
  companyFax: honeypot,
});

export const applicationRequestSchema = z.object({
  values: applicationValuesSchema,
  utm: z
    .object({
      utm_source: shortText(150),
      utm_medium: shortText(150),
      utm_campaign: shortText(150),
    })
    .partial()
    .optional()
    .default({}),
  // Field name deliberately unrelated to any real field so autofill/bots
  // don't skip it the way they might skip something named "website".
  companyFax: honeypot,
});

// answers: questionId -> option index (0-3 for every question today, but
// validated as a small bounded int rather than hardcoding 3 so a future
// question with more options doesn't require touching this file).
export const scoreAnswersSchema = z.record(z.string().min(1).max(60), z.number().int().min(0).max(10));

export const scoreRequestSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  company: z.string().trim().min(1).max(150),
  email: z.string().trim().email().max(200),
  phone: shortText(40),
  answers: scoreAnswersSchema,
  utm: z
    .object({
      utm_source: shortText(150),
      utm_medium: shortText(150),
      utm_campaign: shortText(150),
    })
    .partial()
    .optional()
    .default({}),
  companyFax: honeypot,
});

// Playbook lead-magnet funnel — deliberately minimal (first name + email
// only; no phone, company, or business data — see the funnel brief's Part
// 4/Section 08 "Do NOT ask for" list).
export const playbookRequestSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  utm: z
    .object({
      utm_source: shortText(150),
      utm_medium: shortText(150),
      utm_campaign: shortText(150),
    })
    .partial()
    .optional()
    .default({}),
  companyFax: honeypot,
});
