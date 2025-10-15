import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { error, errorBoundary, additionalInfo, context } = body;

    console.log('🔍 Received error data:', { error, errorBoundary, additionalInfo });

    // 환경변수 확인
    const slackToken = process.env.NEXT_PUBLIC_SLACK_BOT_TOKEN;
    if (!slackToken) {
      return NextResponse.json({ error: 'Slack token not configured' }, { status: 500 });
    }

    // 에러 정보 수집
    const timestamp = new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // 에러 메시지와 스택 트레이스 추출
    const errorMessage = error?.message || error?.errorMessage || 'Unknown error';
    const errorStack = error?.stack || error?.errorStack || 'No stack trace available';

    // Slack 메시지 구성
    const slackMessage = `🚨 *클라이언트 에러 발생*

*에러 메시지:* ${errorMessage}
*에러 바운더리:* ${errorBoundary}
*타임스탬프:* ${timestamp} (KST)
${context?.url ? `*URL:* ${context.url}\n` : ''}
${context?.userAgent ? `*User Agent:* ${context.userAgent}\n` : ''}
${context?.browser ? `*브라우저:* ${context.browser.name} ${context.browser.version}\n` : ''}
${context?.platform ? `*플랫폼:* ${context.platform}\n` : ''}
${context?.language ? `*언어:* ${context.language}\n` : ''}
${context?.screenSize ? `*화면 크기:* ${context.screenSize}\n` : ''}
${context?.viewportSize ? `*뷰포트 크기:* ${context.viewportSize}\n` : ''}
${context?.referrer ? `*리퍼러:* ${context.referrer}\n` : ''}

*스택 트레이스:*
\`\`\`
${errorStack}
\`\`\`

${
  Object.keys(additionalInfo).length > 0
    ? `*추가 정보:*
\`\`\`json
${JSON.stringify(additionalInfo, null, 2)}
\`\`\``
    : ''
}`;

    // Slack API 호출
    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${slackToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel: '#모니터링',
        text: slackMessage,
        unfurl_links: false,
        unfurl_media: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.ok) {
      throw new Error(`Slack API error: ${result.error}`);
    }

    return NextResponse.json({ success: true, message: 'Error sent to Slack successfully' });
  } catch (error) {
    console.error('Failed to send error to Slack:', error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Failed to send error to Slack', details: message },
      { status: 500 },
    );
  }
}
