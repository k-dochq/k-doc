import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'K-DOC';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
            marginBottom: '40px',
          }}
        >
          <img
            src='https://k-doc.vercel.app/kdoc_logo.png'
            alt='K-DOC Logo'
            width='200'
            height='200'
            style={{
              objectFit: 'contain',
            }}
          />
          <div
            style={{
              fontSize: '60px',
              color: '#ffffff',
              fontWeight: '300',
            }}
          >
            |
          </div>
          <img
            src='https://k-doc.vercel.app/klosed_logo.png'
            alt='Klosed Logo'
            width='200'
            height='200'
            style={{
              objectFit: 'contain',
            }}
          />
        </div>

        <div
          style={{
            fontSize: '48px',
            color: '#ffffff',
            fontWeight: '600',
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          K-DOC Service
        </div>

        <div
          style={{
            fontSize: '24px',
            color: '#f0f0f0',
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          Coming Soon
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
