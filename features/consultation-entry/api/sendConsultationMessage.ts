/**
 * K-DOC 상담 채널에 안내 메시지를 남긴다.
 *
 * senderType 을 ADMIN 으로 저장하므로 채팅방에서는 상담원이 먼저 보낸 안내처럼 보인다.
 * 병원은 서버에서 K-DOC 상담 채널로 고정한다.
 */
export async function sendConsultationMessage(content: string): Promise<void> {
  const res = await fetch('/api/concierge/consultation-messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, senderType: 'ADMIN' }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? 'SEND_FAILED');
  }
}
