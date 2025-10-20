import { createBrowserClient } from '@supabase/ssr';

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  // 싱글톤: 이미 생성된 인스턴스가 있으면 재사용
  if (supabaseClient) {
    return supabaseClient;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Supabase URL and Anon Key must be provided');
  }

  supabaseClient = createBrowserClient(url, key);

  return supabaseClient;
}
