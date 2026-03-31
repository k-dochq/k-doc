import { type NextRequest, NextResponse } from 'next/server';
import { isValidLocale, DEFAULT_LOCALE } from 'shared/config';
import { searchHospitalSuggestions } from 'shared/lib/meilisearch';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() ?? '';
  const langParam = searchParams.get('lang') ?? '';
  const lang = isValidLocale(langParam) ? langParam : DEFAULT_LOCALE;

  if (!q) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const suggestions = await searchHospitalSuggestions(q, lang);
    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json({ suggestions: [] });
  }
}
