import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import {
  ContactHero,
  ContactMapSection,
  ContactSeoulMapSection,
  ContactEmailInquiry,
  ContactPartnershipInquiry,
} from 'features/contact/ui';
import { ContactContentV2 } from './ContactContentV2';

interface ContactPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    // <div className='px-5 pt-12 pb-20'>
    //   <ContactHero dict={dict} />
    //   <ContactMapSection dict={dict} />
    //   <ContactSeoulMapSection dict={dict} />
    //   <ContactEmailInquiry dict={dict} />
    //   <ContactPartnershipInquiry dict={dict} />
    // </div>

    <ContactContentV2 lang={lang} dict={dict} />
  );
}
