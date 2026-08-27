import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getIndustryPage } from '@/lib/config/industryPages';

export const alt = 'Home-Service Contractor Marketing & Lead Generation — Lusso Media';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ industry: string }> }) {
  const { industry: slug } = await params;
  const industry = getIndustryPage(slug);
  const logoData = readFileSync(join(process.cwd(), 'public/images/logo.png'));
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;
  const name = industry?.name ?? 'Home Service';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0B',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          fontFamily: 'system-ui, sans-serif',
          padding: '56px 64px',
        }}
      >
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
            top: '-120px',
            left: '-120px',
            width: 620,
            height: 620,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at center, rgba(0,128,128,0.20) 0%, rgba(0,128,128,0.05) 45%, transparent 70%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoBase64} width={40} height={40} style={{ objectFit: 'contain' }} alt="" />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
            maxWidth: 760,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#00C2C2',
              marginBottom: 18,
            }}
          >
            {`FOR ESTABLISHED ${name.toUpperCase()} CONTRACTORS`}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 54,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              marginBottom: 22,
            }}
          >
            {`${name} Marketing & Lead Generation`}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 19,
              color: '#B8B9BA',
              lineHeight: 1.5,
              maxWidth: 600,
            }}
          >
            {`The Local Dominance System™ — demand generation, lead conversion, and local authority for ${name.toLowerCase()} contractors.`}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 340,
            height: 3,
            background: 'linear-gradient(270deg, #00A8A8, transparent)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
