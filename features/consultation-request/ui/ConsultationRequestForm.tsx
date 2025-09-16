'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type Hospital } from 'entities/hospital/api/entities/types';
import { extractLocalizedText } from 'shared/lib';
import { ArrowLeft } from 'lucide-react';
import { LocaleLink } from 'shared/ui/locale-link';

interface ConsultationRequestFormProps {
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationRequestForm({ lang, dict }: ConsultationRequestFormProps) {
  return <div />;
}
