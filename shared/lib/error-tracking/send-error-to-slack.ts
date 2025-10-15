'use client';

interface ErrorInfo {
  error: Error;
  errorBoundary?: string;
  additionalInfo?: Record<string, any>;
}

interface SlackMessage {
  channel: string;
  text: string;
  unfurl_links: boolean;
  unfurl_media: boolean;
}

/**
 * 클라이언트 에러를 Slack으로 전송하는 함수
 */
export async function sendErrorToSlack({
  error,
  errorBoundary = 'unknown',
  additionalInfo = {},
}: ErrorInfo): Promise<void> {
  try {
    console.log('🚀 sendErrorToSlack called:', { error: error.message, errorBoundary });

    // 환경변수 확인
    const slackToken = process.env.NEXT_PUBLIC_SLACK_BOT_TOKEN;
    console.log('🔑 Slack token exists:', !!slackToken);
    if (!slackToken) {
      console.warn('NEXT_PUBLIC_SLACK_BOT_TOKEN is not set');
      return;
    }

    // 브라우저 환경 확인
    if (typeof window === 'undefined') {
      console.warn('sendErrorToSlack can only be called on client side');
      return;
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

    const userAgent = window.navigator.userAgent;
    const url = window.location.href;
    const screenSize = `${window.innerWidth}x${window.innerHeight}`;
    const viewportSize = `${window.screen.width}x${window.screen.height}`;

    // 브라우저 정보 파싱
    const browserInfo = parseUserAgent(userAgent);

    // 추가 정보 수집
    const referrer = document.referrer || 'Direct access';
    const language = window.navigator.language;
    const platform = window.navigator.platform;

    // Slack 메시지 구성
    const slackMessage = `🚨 *클라이언트 에러 발생*

*에러 메시지:* ${error.message}
*에러 바운더리:* ${errorBoundary}
*URL:* ${url}
*타임스탬프:* ${timestamp} (KST)
*브라우저:* ${browserInfo.name} ${browserInfo.version}
*OS:* ${browserInfo.os}
*플랫폼:* ${platform}
*언어:* ${language}
*화면 크기:* ${screenSize}
*뷰포트 크기:* ${viewportSize}
*리퍼러:* ${referrer}

*스택 트레이스:*
\`\`\`
${error.stack || 'No stack trace available'}
\`\`\`

${
  Object.keys(additionalInfo).length > 0
    ? `*추가 정보:*
\`\`\`json
${JSON.stringify(additionalInfo, null, 2)}
\`\`\``
    : ''
}`;

    // Next.js API Route를 통해 Slack으로 전송
    console.log('📤 Sending to Slack via API Route:', {
      messageLength: slackMessage.length,
    });

    const response = await fetch('/api/send-error-to-slack', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: {
          message: error.message,
          stack: error.stack,
          name: error.name,
        },
        errorBoundary,
        // 브라우저/환경 컨텍스트 전달
        context: {
          url,
          timestamp,
          userAgent,
          browser: browserInfo,
          screenSize,
          viewportSize,
          referrer,
          language,
          platform,
        },
        additionalInfo,
      }),
    });

    console.log('📡 API Route response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Route error: ${errorData.error || response.statusText}`);
    }

    const result = await response.json();
    console.log('📨 API Route result:', result);

    console.log('✅ Error sent to Slack successfully');
  } catch (slackError) {
    // Slack 전송 실패 시에도 앱이 중단되지 않도록 처리
    console.error('Failed to send error to Slack:', slackError);
  }
}

/**
 * User Agent 문자열을 파싱하여 브라우저 정보 추출
 */
function parseUserAgent(userAgent: string): { name: string; version: string; os: string } {
  // Chrome
  if (userAgent.includes('Chrome')) {
    const match = userAgent.match(/Chrome\/(\d+\.\d+)/);
    return {
      name: 'Chrome',
      version: match ? match[1] : 'Unknown',
      os: getOS(userAgent),
    };
  }

  // Firefox
  if (userAgent.includes('Firefox')) {
    const match = userAgent.match(/Firefox\/(\d+\.\d+)/);
    return {
      name: 'Firefox',
      version: match ? match[1] : 'Unknown',
      os: getOS(userAgent),
    };
  }

  // Safari
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    const match = userAgent.match(/Version\/(\d+\.\d+)/);
    return {
      name: 'Safari',
      version: match ? match[1] : 'Unknown',
      os: getOS(userAgent),
    };
  }

  // Edge
  if (userAgent.includes('Edg')) {
    const match = userAgent.match(/Edg\/(\d+\.\d+)/);
    return {
      name: 'Edge',
      version: match ? match[1] : 'Unknown',
      os: getOS(userAgent),
    };
  }

  return {
    name: 'Unknown',
    version: 'Unknown',
    os: getOS(userAgent),
  };
}

/**
 * User Agent에서 OS 정보 추출
 */
function getOS(userAgent: string): string {
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac OS')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS')) return 'iOS';
  return 'Unknown';
}
