// save as: decode-supabase-auth.ts
// Usage examples:
// 1) 단일 쿠키값:  ts-node decode-supabase-auth.ts "base64-xxxxx..."
// 2) 분할 쿠키(.0 .1): ts-node decode-supabase-auth.ts "base64-xxx_part0" "yyy_part1"
// 3) --show-tokens 플래그로 전체 토큰 출력: ts-node decode-supabase-auth.ts --show-tokens "<cookie0>" "<cookie1>"
//
// 보안주의: 프로덕션/공유 환경에서 --show-tokens 사용 금지!

type SupabaseSessionLike = {
  access_token: string;
  refresh_token?: string;
  token_type?: string; // "bearer"
  expires_in?: number; // seconds
  expires_at?: number; // unix seconds
  user?: {
    id?: string;
    email?: string;
    [k: string]: unknown;
  };
  app_metadata?: {
    provider?: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
};

type ParsedJwt = {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
};

function base64ToString(b64: string): string {
  const raw = b64.replace(/^base64-/, '');
  return Buffer.from(raw, 'base64').toString('utf8');
}

function base64urlToString(s: string): string {
  // Base64URL → Base64
  let b = s.replace(/-/g, '+').replace(/_/g, '/');
  while (b.length % 4) b += '=';
  return Buffer.from(b, 'base64').toString('utf8');
}

function parseJwt(jwt: string): ParsedJwt {
  const parts = jwt.split('.');
  if (parts.length !== 3) {
    throw new Error('Not a JWS Compact JWT. Expected 3 segments "HEADER.PAYLOAD.SIGNATURE".');
  }
  const [h, p] = parts;
  const header = JSON.parse(base64urlToString(h));
  const payload = JSON.parse(base64urlToString(p));
  return { header, payload };
}

function tryParseJson(jsonStr: string): any {
  try {
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}

function humanTimeFromUnix(unixSeconds?: number): string | null {
  if (!unixSeconds || !Number.isFinite(unixSeconds)) return null;
  return new Date(unixSeconds * 1000).toISOString();
}

function print(obj: unknown) {
  console.log(JSON.stringify(obj, null, 2));
}

function main() {
  const args = process.argv.slice(2);
  const showTokens = args.includes('--show-tokens');
  const filtered = args.filter((a) => a !== '--show-tokens');

  if (filtered.length < 1) {
    console.error('Provide one cookie value (single) or two values (.0 .1).');
    console.error('Example: ts-node decode-supabase-auth.ts "base64-xxxxx"');
    console.error('         ts-node decode-supabase-auth.ts "base64-xxx_part0" "yyy_part1"');
    process.exit(1);
  }

  // 하나만 주면 단일 쿠키, 두 개 주면 분할 쿠키로 간주해 결합
  const combinedCookieValue = filtered.length === 1 ? filtered[0] : filtered.join('');

  // 1) Base64 디코딩 → 세션 JSON 문자열
  const sessionJsonStr = base64ToString(combinedCookieValue);
  const session = tryParseJson(sessionJsonStr) as SupabaseSessionLike | null;

  if (!session) {
    console.error('Failed to parse Supabase session JSON from cookie value.');
    process.exit(1);
  }

  const access = session.access_token;
  if (!access) {
    console.error('No access_token in Supabase session JSON.');
    if (showTokens) {
      console.error('Session JSON was:');
      print(session);
    }
    process.exit(1);
  }

  // 2) JWT 파싱
  let jwtParsed: ParsedJwt;
  try {
    jwtParsed = parseJwt(access);
  } catch (e: any) {
    console.error('Failed to parse JWT access_token:', e.message);
    if (showTokens) {
      console.error('\naccess_token value:');
      console.error(access);
    }
    process.exit(1);
  }

  // 3) 결과 요약 출력
  const payload = jwtParsed.payload as Record<string, unknown>;
  const exp = typeof payload['exp'] === 'number' ? (payload['exp'] as number) : undefined;

  const summary = {
    ok: true,
    sessionSummary: {
      token_type: session.token_type ?? 'bearer',
      has_refresh_token: Boolean(session.refresh_token),
      expires_in_seconds: session.expires_in ?? null,
      expires_at_unix: session.expires_at ?? exp ?? null,
      expires_at_ISO: humanTimeFromUnix(session.expires_at ?? exp),
      provider:
        session.app_metadata?.provider ?? (payload['app_metadata'] as any)?.provider ?? null,
      user_id: session.user?.id ?? (payload['sub'] as string | undefined) ?? null,
      user_email: session.user?.email ?? (payload['email'] as string | undefined) ?? null,
    },
    jwt: {
      header: jwtParsed.header,
      payload: jwtParsed.payload,
    },
  };

  print(summary);

  if (showTokens) {
    console.log('\n--- [Sensitive] Raw Tokens (do not log in production) ---');
    console.log('access_token:\n', access);
    if (session.refresh_token) {
      console.log('\nrefresh_token:\n', session.refresh_token);
    }
  }
}

main();
