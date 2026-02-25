import { type Locale } from 'shared/config';
import { WhatsAppLandingPage } from './_components/WhatsAppLandingPage';

interface WhatsAppQuotePageProps {
  params: Promise<{ lang: Locale }>;
}

export const metadata = {
  title: '3분 시크릿 견적 | K-DOC',
  description: '병원 방문 전, 사진 한 장으로 끝내는 3분 시크릿 견적. WhatsApp으로 즉시 연결되어 무료 견적을 받아보세요.',
};

export default async function WhatsAppQuotePage({ params }: WhatsAppQuotePageProps) {
  const { lang } = await params;
  return <WhatsAppLandingPage lang={lang} />;
}
