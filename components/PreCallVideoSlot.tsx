// Optional 60–90 second founder video slot for the /plan-confirmed page
// (Part 21). No video exists yet — per Part 21/29, we do not fabricate one.
// This renders nothing until a real asset is supplied, so the page works
// perfectly without it.
//
// To populate later: drop the file at
// public/videos/plan-confirmed-intro.mp4 (or .webm) and set
// VIDEO_SRC below. Recommended spec:
//   - Duration: 60–90 seconds
//   - Aspect ratio: 16:9, minimum 1280x720 (1920x1080 preferred)
//   - Format: H.264 MP4 (widest compatibility), under ~15MB
//   - Content: what the call covers, what Lusso looks for, that Lusso is
//     evaluating fit too, and what numbers to bring
//   - Provide (or let us generate) a poster/thumbnail frame — do not
//     autoplay with sound

const VIDEO_SRC: string | null = null;
const POSTER_SRC: string | null = null;

export default function PreCallVideoSlot() {
  if (!VIDEO_SRC) return null;

  return (
    <div className="max-w-2xl mx-auto px-6 mb-10">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#141414]">
        <video controls preload="metadata" poster={POSTER_SRC ?? undefined} className="w-full h-full object-cover">
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
