'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { AnimatePresence, motion } from 'framer-motion';
import {
  MessageCircle,
  Check,
  ChevronDown,
  AlertCircle,
} from 'lucide-react';
import { cn } from 'shared/lib/utils';
import type { Locale } from 'shared/config';
import {
  EyesIconV2,
  NoseIconV2,
  FacialContouringIconV2,
  DermatologyIconV2,
  LiftingIconV2,
  LiposuctionIconV2,
  BreastIconV2,
  OtherIconV2,
} from 'features/quick-menu/ui/icons';

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens
// ─────────────────────────────────────────────────────────────────────────────
const PRIMARY       = '#6C5CE7';
const PRIMARY_LIGHT = '#EDE9FF';
const BG_PAGE       = '#F4F4F9';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const HOSPITAL_WHATSAPP_NUMBER = '821012345678';

const CAROUSEL_SLIDES = [
  {
    id: 'eyes',
    category: '눈 성형',
    tags: ['쌍꺼풀', '눈매교정', '앞트임'],
    emoji: '👁',
    bg: 'linear-gradient(135deg, #EDE9FF 0%, #DDD6FE 100%)',
    badge: 'BEST',
  },
  {
    id: 'nose',
    category: '코 성형',
    tags: ['코끝성형', '콧대', '코축소'],
    emoji: '✨',
    bg: 'linear-gradient(135deg, #FFF0F9 0%, #FCE7F3 100%)',
    badge: 'HOT',
  },
  {
    id: 'vline',
    category: 'V-라인 윤곽',
    tags: ['사각턱', '광대', '페이스라인'],
    emoji: '💆',
    bg: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
    badge: 'NEW',
  },
  {
    id: 'skin',
    category: '피부 시술',
    tags: ['레이저', '보톡스', '필러'],
    emoji: '🌿',
    bg: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
    badge: 'HOT',
  },
  {
    id: 'lifting',
    category: '리프팅',
    tags: ['실리프팅', '쁘띠', '울쎄라'],
    emoji: '💎',
    bg: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
    badge: 'BEST',
  },
];

const BODY_PARTS = [
  { id: 'eyes',        label: '눈',      Icon: EyesIconV2 },
  { id: 'nose',        label: '코',      Icon: NoseIconV2 },
  { id: 'vline',       label: '윤곽',    Icon: FacialContouringIconV2 },
  { id: 'skin',        label: '피부',    Icon: DermatologyIconV2 },
  { id: 'lifting',     label: '리프팅',  Icon: LiftingIconV2 },
  { id: 'liposuction', label: '지방흡입', Icon: LiposuctionIconV2 },
  { id: 'breast',      label: '가슴',    Icon: BreastIconV2 },
  { id: 'other',       label: '기타',    Icon: OtherIconV2 },
];

const COUNTRY_CODES = [
  { flag: '🇰🇷', code: '+82',  name: '한국' },
  { flag: '🇹🇭', code: '+66',  name: 'Thailand' },
  { flag: '🇵🇭', code: '+63',  name: 'Philippines' },
  { flag: '🇺🇸', code: '+1',   name: 'USA' },
  { flag: '🇯🇵', code: '+81',  name: '日本' },
  { flag: '🇨🇳', code: '+86',  name: '中国' },
  { flag: '🇹🇼', code: '+886', name: '台灣' },
  { flag: '🇮🇳', code: '+91',  name: 'India' },
  { flag: '🇦🇪', code: '+971', name: 'UAE' },
  { flag: '🇸🇦', code: '+966', name: 'Saudi' },
  { flag: '🇷🇺', code: '+7',   name: 'Россия' },
  { flag: '🇸🇬', code: '+65',  name: 'Singapore' },
  { flag: '🇲🇾', code: '+60',  name: 'Malaysia' },
  { flag: '🇬🇧', code: '+44',  name: 'UK' },
  { flag: '🇻🇳', code: '+84',  name: 'Việt Nam' },
  { flag: '🇮🇩', code: '+62',  name: 'Indonesia' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Hero Carousel
// ─────────────────────────────────────────────────────────────────────────────

function HeroCarousel() {
  const autoplayPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplayPlugin.current]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {CAROUSEL_SLIDES.map((slide) => (
            <div key={slide.id} className="min-w-full px-4">
              <div
                className="relative flex h-[188px] flex-col items-center justify-center overflow-hidden rounded-2xl"
                style={{ background: slide.bg }}
              >
                <span
                  className="absolute left-3 top-3 rounded-md px-2 py-0.5 text-[10px] font-bold text-white"
                  style={{ background: PRIMARY }}
                >
                  {slide.badge}
                </span>
                <span className="absolute bottom-3 right-3 rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                  {current + 1} / {CAROUSEL_SLIDES.length}
                </span>
                <span className="text-5xl">{slide.emoji}</span>
                <h3 className="mt-2.5 text-[17px] font-bold text-gray-800">{slide.category}</h3>
                <div className="mt-2.5 flex gap-1.5">
                  {slide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] font-medium text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2.5 flex justify-center gap-1.5">
        {CAROUSEL_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: i === current ? 18 : 6, background: i === current ? PRIMARY : '#D1D5DB' }}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

interface FormErrors { parts?: string; phone?: string; consent?: string; }

export function WhatsAppLandingPage({ lang: _lang }: { lang: Locale }) {
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [countryCode, setCountryCode] = useState('+66');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setShowPicker(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const togglePart = (id: string) => {
    setSelectedParts((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
    if (errors.parts) setErrors((e) => ({ ...e, parts: undefined }));
  };

  const validate = () => {
    const e: FormErrors = {};
    if (!selectedParts.length) e.parts = '부위를 1개 이상 선택해주세요';
    if (!phone.trim())         e.phone = 'WhatsApp 번호를 입력해주세요';
    if (!consent)              e.consent = '개인정보 수집·이용에 동의해주세요';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = () => {
    // 연락처 미입력 상태라면 스크롤 유도만

    if (!validate() || isSubmitting) return;
    setIsSubmitting(true);

    const parts = selectedParts
      .map((id) => BODY_PARTS.find((p) => p.id === id)?.label)
      .filter(Boolean).join(', ');

    const text = [
      `[K-DOC 시크릿 견적 문의]`,
      `관심 부위: ${parts}`,
      `WhatsApp: ${countryCode} ${phone}`,
      message ? `문의: ${message}` : '',
    ].filter(Boolean).join('\n');

    window.open(
      `https://wa.me/${HOSPITAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank', 'noopener,noreferrer',
    );
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode);
  const inputBase = 'h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-800 placeholder-gray-300 shadow-sm outline-none transition-colors focus:border-[#6C5CE7]';

  return (
    <div className="min-h-screen pb-28" style={{ background: BG_PAGE }}>

      {/* ── Top banner ── */}
      <div className="flex items-center justify-center gap-1.5 py-2.5" style={{ background: PRIMARY }}>
        <div className="relative flex h-1.5 w-1.5">
          <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
          <div className="relative h-1.5 w-1.5 rounded-full bg-white" />
        </div>
        <p className="text-xs font-semibold text-white">
          WhatsApp 실시간 상담 · 평균 응답 <strong>3분</strong>
        </p>
      </div>

      {/* ── Carousel ── */}
      <div className="bg-white pt-4">
        <HeroCarousel />

        {/* ── Headline ── */}
        <div className="px-4 pb-5 pt-5">
          <h1 className="text-[22px] font-black leading-snug tracking-tight text-gray-900">
            병원 방문 전,{' '}
            <span style={{ color: PRIMARY }}>3분 시크릿 견적</span>
          </h1>
          <p className="mt-1.5 text-sm text-gray-400">
            상담 실장님이 직접 답변해 드립니다
          </p>
        </div>
      </div>

      <div className="h-2" />

      {/* ── Form card ── */}
      <div className="bg-white px-4 py-5">

        {/* Body part selector */}
        <p className="mb-3 text-[13px] font-semibold text-gray-700">
          관심 부위 <span style={{ color: PRIMARY }}>*</span>
        </p>
        <div className="grid grid-cols-4 gap-x-2 gap-y-4">
          {BODY_PARTS.map((part) => {
            const on = selectedParts.includes(part.id);
            return (
              <button
                key={part.id}
                onClick={() => togglePart(part.id)}
                className="flex flex-col items-center gap-1.5 transition-transform duration-100 active:scale-95"
              >
                <div
                  className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 transition-all duration-150"
                  style={{
                    borderColor: on ? PRIMARY : '#E5E7EB',
                    background: on ? PRIMARY_LIGHT : '#FFFFFF',
                    boxShadow: on ? `0 0 0 3px ${PRIMARY}22` : '0 1px 3px rgba(0,0,0,0.06)',
                  }}
                >
                  <part.Icon />
                </div>
                <span
                  className="text-[11px] font-semibold"
                  style={{ color: on ? PRIMARY : '#6B7280' }}
                >
                  {part.label}
                </span>
              </button>
            );
          })}
        </div>
        {errors.parts && (
          <div className="mt-3 flex items-center gap-1">
            <AlertCircle className="h-3 w-3 text-red-400" />
            <p className="text-xs text-red-400">{errors.parts}</p>
          </div>
        )}

        <div className="mt-5 space-y-4">
          {/* ── WhatsApp 번호 (항상 노출) ── */}
          <div>
            <p className="mb-2 text-[13px] font-semibold text-gray-700">
              내 WhatsApp 번호 <span style={{ color: PRIMARY }}>*</span>
            </p>
            <div className="flex gap-2">
              <div ref={pickerRef} className="relative shrink-0">
                <button
                  onClick={() => setShowPicker(!showPicker)}
                  className={cn(inputBase, 'flex items-center gap-1.5 px-3')}
                >
                  <span>{selectedCountry?.flag}</span>
                  <span className="text-xs text-gray-500">{countryCode}</span>
                  <ChevronDown className={cn('h-3 w-3 text-gray-400 transition-transform', showPicker && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {showPicker && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.12 }}
                      className="absolute left-0 top-12 z-50 max-h-52 w-48 overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-xl"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => { setCountryCode(c.code); setShowPicker(false); }}
                          className={cn(
                            'flex w-full items-center gap-2.5 px-3 py-2.5 text-sm hover:bg-gray-50',
                            countryCode === c.code && 'bg-[#EDE9FF]',
                          )}
                        >
                          <span>{c.flag}</span>
                          <span className="w-9 shrink-0 text-[11px] text-gray-400">{c.code}</span>
                          <span className="truncate text-xs text-gray-600">{c.name}</span>
                          {countryCode === c.code && <Check className="ml-auto h-3 w-3 shrink-0" style={{ color: PRIMARY }} />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors((v) => ({ ...v, phone: undefined })); }}
                placeholder="번호 입력 (숫자만)"
                className={cn(inputBase, 'flex-1', errors.phone && 'border-red-300 focus:border-red-400')}
              />
            </div>
            {errors.phone && (
              <div className="mt-1.5 flex items-center gap-1">
                <AlertCircle className="h-3 w-3 text-red-400" />
                <p className="text-xs text-red-400">{errors.phone}</p>
              </div>
            )}
          </div>

          {/* ── 고민 입력 (접힘) ── */}
          <div>
            <button
              onClick={() => setShowMessage(!showMessage)}
              className="flex w-full items-center justify-between py-1"
            >
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-gray-600">
                  고민 추가 <span className="text-xs font-normal text-gray-400">(선택)</span>
                </span>
                {message && (
                  <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-600">
                    입력됨
                  </span>
                )}
              </div>
              <ChevronDown
                className="h-4 w-4 text-gray-400 transition-transform duration-200"
                style={{ transform: showMessage ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>

            <AnimatePresence initial={false}>
              {showMessage && (
                <motion.div
                  key="message"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pt-2">
                    <textarea
                      value={message}
                      onChange={(e) => { if (e.target.value.length <= 400) setMessage(e.target.value); }}
                      placeholder="예) 코 끝이 뭉툭해서 자연스러운 코 성형을 원해요"
                      rows={3}
                      className="w-full resize-none rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 shadow-sm outline-none transition-colors focus:border-[#6C5CE7]"
                    />
                    <p className="mt-1 text-right text-[10px] text-gray-300">{message.length}/400</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── 개인정보 동의 ── */}
          <label className="flex cursor-pointer items-start gap-2.5">
            <button
              type="button"
              onClick={() => { setConsent(!consent); if (errors.consent) setErrors((v) => ({ ...v, consent: undefined })); }}
              className={cn(
                'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded transition-all',
                consent ? 'border-0' : 'border border-gray-300 bg-white',
              )}
              style={consent ? { background: PRIMARY } : undefined}
            >
              {consent && <Check className="h-2.5 w-2.5 text-white" />}
            </button>
            <span className="text-[11px] leading-relaxed text-gray-400">
              개인정보 수집·이용에 동의합니다.{' '}
              <span className="underline underline-offset-2" style={{ color: PRIMARY }}>자세히 보기</span>
            </span>
          </label>
          {errors.consent && (
            <div className="-mt-2 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 text-red-400" />
              <p className="text-xs text-red-400">{errors.consent}</p>
            </div>
          )}
        </div>
      </div>


      {/* ── Floating CTA ── */}
      <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[500px] -translate-x-1/2 px-4 pb-6 pt-3"
        style={{ background: 'linear-gradient(to top, #F4F4F9 60%, transparent)' }}
      >
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50"
            >
              <Check className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-bold text-emerald-700">WhatsApp이 실행됐어요!</span>
            </motion.div>
          ) : (
            <motion.button
              key="cta"
              onClick={handleSubmit}
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl font-bold text-white shadow-lg disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
            >
              {isSubmitting
                ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                : <MessageCircle className="h-5 w-5" />
              }
              <span className="text-[15px]">
                {isSubmitting ? '연결 중...' : '무료 견적 받기'}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
