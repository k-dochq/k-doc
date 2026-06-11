import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';

// GET /api/chatbot-cms?locale=ko
// 챗봇 CMS 콘텐츠를 단일 locale 기준으로 반환
export async function GET(request: NextRequest): Promise<NextResponse> {
  const locale = request.nextUrl.searchParams.get('locale') ?? 'ko';

  try {
    const [welcome, menus, completionMessages] = await Promise.all([
      prisma.chatbotWelcomeMessage.findFirst(),
      prisma.chatbotMenu.findMany({
        where: { isEnabled: true },
        orderBy: { order: 'asc' },
        include: {
          ChatbotMenuFaqItem: {
            where: { isEnabled: true },
            orderBy: { order: 'asc' },
          },
        },
      }),
      prisma.chatbotCompletionMessage.findMany(),
    ]);

    const pick = (json: unknown, fallback = '') => {
      if (!json || typeof json !== 'object') return fallback;
      const record = json as Record<string, string>;
      return record[locale] ?? record['ko'] ?? fallback;
    };

    return NextResponse.json({
      welcome: pick(welcome?.content),
      menus: menus.map((m) => ({
        key: m.key,
        label: pick(m.labels),
        prompt: pick(m.prompts),
        hasSubMenu: m.hasSubMenu,
        faqItems: m.ChatbotMenuFaqItem.map((f) => ({
          id: f.id,
          order: f.order,
          title: pick(f.titles),
          content: pick(f.contents),
          showConsultButton: f.showConsultButton,
          showMenuButton: f.showMenuButton,
        })),
      })),
      completionMessages: {
        inHours: pick(completionMessages.find((m) => m.isInHours)?.content),
        outOfHours: pick(completionMessages.find((m) => !m.isInHours)?.content),
      },
    });
  } catch (error) {
    console.error('GET /api/chatbot-cms error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
