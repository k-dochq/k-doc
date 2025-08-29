import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
        }}
      >
        <img
          src='https://k-doc.vercel.app/kdoc_logo.png'
          alt='K-DOC'
          width='24'
          height='24'
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
