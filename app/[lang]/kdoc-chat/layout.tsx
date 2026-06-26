import { type Locale } from 'shared/config';

interface KdocChatLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function KdocChatLayout({ children }: KdocChatLayoutProps) {
  return (
    <div className='flex h-dvh flex-col bg-white'>
      {children}
    </div>
  );
}
