import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const alt = 'Lusso Media — Done-for-You Content & Ad Partnership';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logoData = readFileSync(join(process.cwd(), 'public/images/logo.png'));
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0D0D0D',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
              'linear-gradient(rgba(197,198,199,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(197,198,199,0.04) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />

        {/* Teal radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 900,
            height: 500,
            transform: 'translate(-450px, -250px)',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at center, rgba(0,128,128,0.22) 0%, rgba(0,128,128,0.06) 45%, transparent 70%)',
          }}
        />

        {/* Corner accent — top left */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 300,
            height: 2,
            background: 'linear-gradient(90deg, #008080, transparent)',
          }}
        />
        {/* Corner accent — bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 300,
            height: 2,
            background: 'linear-gradient(270deg, #008080, transparent)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
            }}
        >
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            width={96}
            height={96}
            style={{ objectFit: 'contain', marginBottom: 28 }}
            alt="Lusso Media"
          />

          {/* Brand name */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              marginBottom: 8,
            }}
          >
            Lusso Media
          </div>

          {/* Teal divider */}
          <div
            style={{
              width: 56,
              height: 3,
              background: 'linear-gradient(90deg, #008080, #00c8c8)',
              borderRadius: 2,
              marginBottom: 28,
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: 22,
              color: '#C5C6C7',
              textAlign: 'center',
              maxWidth: 680,
              lineHeight: 1.55,
              fontWeight: 400,
            }}
          >
            A fully managed growth system for businesses ready for consistent demand.
          </div>

          {/* Badge */}
          <div
            style={{
              marginTop: 36,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              border: '1px solid rgba(0,128,128,0.4)',
              borderRadius: 999,
              background: 'rgba(0,128,128,0.1)',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#008080',
              }}
            />
            <div style={{ fontSize: 15, color: '#008080', fontWeight: 600 }}>
              illussomedia.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
