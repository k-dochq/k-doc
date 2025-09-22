import { type Locale } from 'shared/config';
import { GradientBackground } from 'shared/ui/gradient-background';

interface HospitalsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function HospitalsLayout({ children }: HospitalsLayoutProps) {
  return (
    <GradientBackground
      gradientColors={{
        start: '#FE906C',
        end: '#FF6CA5',
      }}
    >
      {children}
    </GradientBackground>
  );
}
