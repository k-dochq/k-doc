'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from 'shared/config';

type Category = 'plastic_surgery' | 'dermatology_aesthetic' | 'concierge_reservation' | 'other_inquiry';
type Phase = 'category' | 'guest_form' | 'chat';

interface Message {
  id: string;
  sender: 'kdoc' | 'user';
  content: string;
  timestamp: string;
}

interface KdocChatPageProps {
  lang: Locale;
}

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'plastic_surgery', label: '성형 상담' },
  { key: 'dermatology_aesthetic', label: '피부 시술 상담' },
  { key: 'concierge_reservation', label: '컨시어지 문의' },
  { key: 'other_inquiry', label: '기타' },
];

function nowTime() {
  return new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function todayLabel() {
  return new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

/* ---------- 아이콘 컴포넌트 ---------- */

function BackArrowIcon() {
  return (
    <svg width='9' height='16' viewBox='0 0 8.5 15.5' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M7.75 0.75L0.75 7.75L7.75 14.75' stroke='#404040' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width='14' height='14' viewBox='0 0 13.5 13.5' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M6.75 6.75L0.75 0.75M6.75 6.75L12.75 12.75M6.75 6.75L12.75 0.75M6.75 6.75L0.75 12.75' stroke='#737373' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}

/* 헤더 K 아이콘: 40×40, K_purple + K_pink 겹침 */
function KdocHeaderIcon() {
  return (
    <div className='relative h-10 w-10 shrink-0'>
      {/* K_purple: left=0, top=3 */}
      <svg className='absolute left-0 top-[3px]' width='24' height='24' viewBox='0 0 24 24' fill='none'>
        <path d='M0 12C0 5.373 5.373 0 12 0C18.627 0 24 5.373 24 12C24 18.627 18.627 24 12 24C5.373 24 0 18.627 0 12Z' fill='#D9D9FF' />
        <path d='M7.333 17.335V6.668H10.066V10.881L13.254 6.668H16.161L12.827 10.801L16.667 17.247H13.759L11.227 13.007L10.066 14.378V17.335H7.333Z' fill='#7657FF' />
      </svg>
      {/* K_pink: left=15, top=13 */}
      <svg className='absolute left-[15px] top-[13px]' width='24' height='24' viewBox='0 0 26 26' fill='none'>
        <path d='M13 0.5C19.904 0.5 25.5 6.096 25.5 13C25.5 19.904 19.904 25.5 13 25.5C6.096 25.5 0.5 19.904 0.5 13C0.5 6.096 6.096 0.5 13 0.5Z' fill='#FCDEFF' stroke='white' />
        <path d='M8.333 18.335V7.668H11.066V11.881L14.254 7.668H17.161L13.827 11.801L17.667 18.247H14.759L12.227 14.007L11.066 15.378V18.335H8.333Z' fill='#F15BFF' />
      </svg>
    </div>
  );
}

/* 메시지 아바타: 32×32, K-DOC 프로필 이미지 */
function KdocMsgAvatar() {
  return (
    <div className='h-8 w-8 shrink-0 overflow-hidden rounded-full border border-[#e5e5e5] bg-[#001872]'>
      <img src='/kdoc-avatar.png' alt='K-DOC' className='h-full w-full object-cover' />
    </div>
  );
}

/* 카메라 아이콘 */
function CameraIcon() {
  return (
    <svg width='28' height='28' viewBox='0 0 28 28' fill='none'>
      <path d='M14 11.668C12.103 11.668 10.5 13.271 10.5 15.168C10.5 17.065 12.103 18.668 14 18.668C15.897 18.668 17.5 17.065 17.5 15.168C17.5 13.271 15.897 11.668 14 11.668Z' fill='#A3A3A3' />
      <path d='M23.338 7H20.321L17.163 3.842C16.944 3.623 16.647 3.5 16.338 3.5H11.671C11.362 3.5 11.065 3.623 10.846 3.842L7.688 7H4.671C3.384 7 2.338 8.047 2.338 9.333V22.167C2.338 23.454 3.384 24.5 4.671 24.5H23.338C24.625 24.5 25.671 23.454 25.671 22.167V9.333C25.671 8.047 24.625 7 23.338 7ZM14.005 21C10.843 21 8.171 18.328 8.171 15.167C8.171 12.005 10.843 9.333 14.005 9.333C17.166 9.333 19.838 12.005 19.838 15.167C19.838 18.328 17.166 21 14.005 21Z' fill='#A3A3A3' />
    </svg>
  );
}

/* 전송 아이콘 (그라디언트 종이비행기) */
function SendIcon() {
  return (
    <svg width='30' height='30' viewBox='0 0 30 30' fill='none'>
      <path d='M20.175 3.699L8.888 7.449C1.3 9.986 1.3 14.124 8.888 16.649L12.238 17.761L13.35 21.111C15.875 28.699 20.025 28.699 22.55 21.111L26.313 9.836C27.988 4.774 25.238 2.011 20.175 3.699ZM20.575 10.424L15.825 15.199C15.638 15.386 15.4 15.474 15.163 15.474C14.925 15.474 14.688 15.386 14.5 15.199C14.326 15.022 14.228 14.784 14.228 14.536C14.228 14.288 14.326 14.05 14.5 13.874L19.25 9.099C19.613 8.736 20.213 8.736 20.575 9.099C20.938 9.461 20.938 10.061 20.575 10.424Z' fill='url(#send-grad)' />
      <defs>
        <linearGradient id='send-grad' x1='3.197' y1='15.003' x2='26.804' y2='15.003' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#3E57E2' />
          <stop offset='0.4' stopColor='#B133FF' />
          <stop offset='1' stopColor='#FF5DCA' />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---------- 메인 컴포넌트 ---------- */

export function KdocChatPage({ lang }: KdocChatPageProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('category');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'kdoc',
      content: '안녕하세요, 고객님 😀\nK-DOC 1:1 채팅 상담센터입니다.\n\n궁금하신 사항을 선택해주세요 😊\n해당하는 문의가 없는 경우 [기타]를\n선택해 주세요.\n\n운영시간(KST) - 토, 일, 공휴일 제외\n평일 09:00 ~ 18:00',
      timestamp: nowTime(),
    },
  ]);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestNationality, setGuestNationality] = useState('');
  const [chatInput, setChatInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, phase]);

  const handleCategorySelect = (category: Category) => {
    if (selectedCategory) return;
    setSelectedCategory(category);
    const label = CATEGORIES.find((c) => c.key === category)?.label ?? '';
    setMessages((prev) => [
      ...prev,
      { id: 'user-cat', sender: 'user', content: label, timestamp: nowTime() },
      {
        id: 'kdoc-form',
        sender: 'kdoc',
        content: '원활한 상담 진행을 위해 정보를 입력해주세요.\n오프라인 상태가 되면 이메일로 답변 알림을 보내드려요.',
        timestamp: nowTime(),
      },
    ]);
    setPhase('guest_form');
  };

  const handleGuestSubmit = () => {
    if (!guestName.trim() || !guestEmail.trim() || !guestNationality.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: 'kdoc-start',
        sender: 'kdoc',
        content: '정보가 저장되었습니다 😊\n상담 내용을 입력해주세요.\n필요한 경우 사진도 함께 업로드할 수 있습니다.\n순차적으로 답변 도와드릴게요.',
        timestamp: nowTime(),
      },
    ]);
    setPhase('chat');
  };

  const handleSend = () => {
    const text = chatInput.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: `user-${Date.now()}`, sender: 'user', content: text, timestamp: nowTime() }]);
    setChatInput('');
  };

  const isFormValid = guestName.trim() && guestEmail.trim() && guestNationality.trim();

  return (
    <>
      {/* GNB 헤더 — bg-white, px-5, h-[58px] */}
      <header className='flex h-[58px] items-center justify-between border-b border-[#e5e5e5] bg-white px-5'>
        {/* 왼쪽: 뒤로가기 + 프로필 */}
        <div className='flex flex-1 items-center gap-1'>
          <button onClick={() => router.back()} className='flex h-6 w-6 items-center justify-center' aria-label='뒤로가기'>
            <BackArrowIcon />
          </button>
          {/* 프로필: icon(40×40) + title */}
          <div className='flex flex-1 items-center gap-[6px]'>
            <KdocHeaderIcon />
            <div className='flex flex-col items-start justify-center'>
              <p className='text-base font-semibold leading-6 text-[#404040]'>K-DOC</p>
              <p className='text-xs leading-4 text-[#a3a3a3]'>빠르게 답변 받으실 수 있어요</p>
            </div>
          </div>
        </div>
        {/* 닫기 */}
        <button onClick={() => router.push(`/${lang}`)} className='flex h-6 w-6 items-center justify-center' aria-label='닫기'>
          <CloseIcon />
        </button>
      </header>

      {/* 메시지 목록 */}
      <div className='flex-1 overflow-y-auto bg-white px-5'>
        {/* 날짜 */}
        <div className='py-5 text-center'>
          <span className='text-sm text-[#737373]'>{todayLabel()}</span>
        </div>

        {messages.map((msg) =>
          msg.sender === 'kdoc' ? (
            /* K-DOC 메시지 */
            <div key={msg.id} className='mb-4 flex flex-col gap-1'>
              {/* 아바타 + 이름 */}
              <div className='flex items-center gap-2'>
                <KdocMsgAvatar />
                <span className='text-sm font-semibold text-[#404040]'>K-DOC</span>
              </div>
              {/* 버블 + 타임스탬프 */}
              <div className='flex items-end gap-2 pl-[38px]'>
                <div className='rounded-xl bg-[#f5f5f5] px-3 py-2'>
                  <p className='whitespace-pre-line text-sm text-[#404040]'>{msg.content}</p>
                </div>
                <span className='shrink-0 text-xs text-[#737373]'>{msg.timestamp}</span>
              </div>
            </div>
          ) : (
            /* 사용자 메시지 */
            <div key={msg.id} className='mb-4 flex justify-end'>
              <div className='flex items-end gap-2'>
                <span className='shrink-0 text-xs text-[#737373]'>{msg.timestamp}</span>
                <div
                  className='rounded-xl px-3 py-2'
                  style={{ background: 'linear-gradient(to bottom, #8b45f6, #6544fa)' }}
                >
                  <p className='whitespace-pre-line text-sm text-[#fafafa]'>{msg.content}</p>
                </div>
              </div>
            </div>
          )
        )}

        {/* 카테고리 칩 — items-start로 content 너비 */}
        {phase === 'category' && (
          <div className='mb-4 flex flex-col items-start gap-2 pl-[38px]'>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategorySelect(cat.key)}
                className='rounded-full border border-[#c0bfff] bg-[#f1eeff] px-4 py-2 text-sm font-medium text-[#7657ff]'
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* 게스트 정보 폼 */}
        {phase === 'guest_form' && (
          <div className='mb-4 flex flex-col gap-2 pl-[38px]'>
            <div className='rounded-xl border border-[#e5e5e5] bg-white px-5 py-5'>
              <div className='flex flex-col gap-4'>
                <div>
                  <label className='mb-1 block text-sm font-medium text-[#404040]'>이름</label>
                  <input
                    type='text'
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder='bm'
                    className='w-full border-b border-[#e5e5e5] py-1 text-sm text-[#404040] outline-none focus:border-[#7657ff]'
                  />
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium text-[#404040]'>이메일</label>
                  <input
                    type='email'
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder='bm@k-doc.kr'
                    className='w-full border-b border-[#e5e5e5] py-1 text-sm text-[#404040] outline-none focus:border-[#7657ff]'
                  />
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium text-[#404040]'>국적</label>
                  <input
                    type='text'
                    value={guestNationality}
                    onChange={(e) => setGuestNationality(e.target.value)}
                    placeholder='USA'
                    className='w-full border-b border-[#e5e5e5] py-1 text-sm text-[#404040] outline-none focus:border-[#7657ff]'
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleGuestSubmit}
              disabled={!isFormValid}
              className='ml-auto text-sm font-medium text-[#7657ff] disabled:text-[#a3a3a3]'
            >
              정보 수정하기
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* 입력창 (chat 단계) */}
      {phase === 'chat' && (
        <div className='flex items-center gap-2 border-t border-[#e5e5e5] bg-white px-5 pb-8 pt-4 shadow-[0px_-8px_8px_rgba(0,0,0,0.04)]'>
          <div className='flex flex-1 items-center gap-2'>
            <button className='shrink-0' aria-label='카메라'>
              <CameraIcon />
            </button>
            <input
              type='text'
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder='무엇이든 물어보세요!'
              className='flex-1 text-sm font-medium text-[#404040] placeholder:text-[#a3a3a3] outline-none'
            />
          </div>
          <button onClick={handleSend} className='shrink-0' aria-label='전송'>
            <SendIcon />
          </button>
        </div>
      )}
    </>
  );
}
