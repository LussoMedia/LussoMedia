import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const alt = 'The Home Service Lead Engine — free 90-day playbook by Lusso Media';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const MOVES = [
  { n: '01', label: 'CAPTURE' },
  { n: '02', label: 'QUALIFY' },
  { n: '03', label: 'FOLLOW UP' },
  { n: '04', label: 'CONVERT' },
];

export default async function Image() {
  const logoData = readFileSync(join(process.cwd(), 'public/images/logo.png'));
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0B',
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(197,198,199,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(197,198,199,0.035) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: 560,
            height: 560,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at center, rgba(0,128,128,0.20) 0%, rgba(0,128,128,0.05) 45%, transparent 70%)',
          }}
        />

        {/* Left column — brand + title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '58%',
            padding: '52px 0 52px 60px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoBase64} width={38} height={38} style={{ objectFit: 'contain', marginBottom: 40 }} alt="" />

          <div
            style={{
              display: 'flex',
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#00C2C2',
              marginBottom: 16,
            }}
          >
            FREE 90-DAY PLAYBOOK
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 46,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            <span>THE HOME SERVICE</span>
            <span style={{ color: '#00C2C2' }}>LEAD ENGINE</span>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 20,
              fontWeight: 600,
              color: '#E8E9E9',
              marginBottom: 14,
            }}
          >
            Capture. Qualify. Follow Up. Convert.
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 16,
              color: '#A8A9AA',
              lineHeight: 1.5,
              maxWidth: 460,
              marginBottom: 24,
            }}
          >
            A practical system for turning more local inquiries into qualified, booked
            opportunities.
          </div>

          <div style={{ display: 'flex', fontSize: 14, color: '#7A7B7C', fontWeight: 500 }}>
            Built for established home-service contractors.
          </div>
        </div>

        {/* Right column — four-move system */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '42%',
            justifyContent: 'center',
            gap: 14,
            padding: '0 56px 0 0',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {MOVES.map((m) => (
            <div
              key={m.n}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '18px 22px',
                background: 'rgba(0,128,128,0.08)',
                border: '1px solid rgba(0,128,128,0.28)',
                borderRadius: 10,
              }}
            >
              <div style={{ display: 'flex', fontSize: 20, fontWeight: 800, color: '#00A8A8' }}>{m.n}</div>
              <div style={{ display: 'flex', fontSize: 19, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.02em' }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 340,
            height: 3,
            background: 'linear-gradient(90deg, #00A8A8, transparent)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
