'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Check, ChevronDown, AlertCircle } from 'lucide-react';
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
const PRIMARY_LIGHT = '#F3F0FF';
const BG_PAGE       = '#F7F7F8';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const HOSPITAL_WHATSAPP_NUMBER = '821012345678';

const CAROUSEL_SLIDES = [
  { id: 'eyes',    category: '눈 성형',    img: '/images/event/whatsapp-quote/carousel-eyes.jpeg',    badge: 'BEST' },
  { id: 'nose',    category: '코 성형',    img: '/images/event/whatsapp-quote/carousel-nose.jpeg',    badge: 'HOT'  },
  { id: 'vline',   category: 'V-라인 윤곽', img: '/images/event/whatsapp-quote/carousel-vline.jpeg',   badge: 'NEW'  },
  { id: 'skin',    category: '피부 시술',  img: '/images/event/whatsapp-quote/carousel-skin.jpeg',    badge: 'HOT'  },
  { id: 'lifting', category: '리프팅',     img: '/images/event/whatsapp-quote/carousel-lifting.jpeg', badge: 'BEST' },
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

const TRUST_STATS = [
  { value: '1.2만+', label: '누적 상담' },
  { value: '3분',    label: '평균 응답' },
  { value: '98%',    label: '만족도' },
];

const HOW_IT_WORKS = [
  { step: '1', title: '부위 선택',  desc: '관심 있는 시술 부위를 선택하세요' },
  { step: '2', title: '번호 입력',  desc: 'WhatsApp 연락처를 입력하세요' },
  { step: '3', title: '견적 수령',  desc: '3분 내로 견적을 WhatsApp으로 받아보세요' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Hero Carousel
// ─────────────────────────────────────────────────────────────────────────────

function HeroCarousel() {
  const autoplayPlugin = useRef(Autoplay({ delay: 3500, stopOnInteraction: false }));
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
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex'>
          {CAROUSEL_SLIDES.map((slide) => (
            <div key={slide.id} className='min-w-full'>
              <div className='relative aspect-[375/212] w-full overflow-hidden'>
                <img
                  src={slide.img}
                  alt={slide.category}
                  className='h-full w-full object-cover'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-2.5 flex justify-center gap-1.5'>
        {CAROUSEL_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className='h-1.5 rounded-full transition-all duration-300'
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

  return (
    <div className='min-h-screen pb-28' style={{ background: BG_PAGE }}>

      {/* ── Live banner ── */}
      <div className='flex items-center justify-center gap-2 py-2.5' style={{ background: PRIMARY }}>
        <span className='relative flex h-1.5 w-1.5'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75' />
          <span className='relative h-1.5 w-1.5 rounded-full bg-white' />
        </span>
        <p className='text-xs font-semibold text-white'>
          WhatsApp 실시간 상담 · 평균 응답 <strong>3분</strong>
        </p>
      </div>

      {/* ── Hero image ── */}
      <div className='relative w-full overflow-hidden' style={{ aspectRatio: '16/9' }}>
        <img
          src='/images/event/whatsapp-quote/hero.jpeg'
          alt='K-DOC K-Beauty Consultation'
          className='h-full w-full object-cover object-top'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white' />
      </div>

      {/* ── Hero text (overlaps image bottom) ── */}
      <div className='relative z-10 -mt-6 rounded-t-3xl bg-white px-5 pb-7 pt-5'>
        <div
          className='mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1'
          style={{ background: PRIMARY_LIGHT }}
        >
          <span className='h-1.5 w-1.5 rounded-full' style={{ background: PRIMARY }} />
          <span className='text-[11px] font-bold tracking-wide' style={{ color: PRIMARY }}>
            K-DOC 무료 견적
          </span>
        </div>

        <h1 className='text-[28px] font-black leading-[1.25] tracking-tight text-gray-900'>
          병원 방문 전,<br />
          <span style={{ color: PRIMARY }}>3분 시크릿 견적</span>
        </h1>
        <p className='mt-3 text-[13px] leading-relaxed text-gray-400'>
          상담 실장님이 WhatsApp으로 직접<br />무료 견적을 보내드립니다
        </p>

        {/* Trust stats */}
        <div className='mt-6 flex divide-x divide-gray-100 overflow-hidden rounded-2xl border border-gray-100'>
          {TRUST_STATS.map(({ value, label }) => (
            <div key={label} className='flex flex-1 flex-col items-center gap-0.5 py-4'>
              <span className='text-[20px] font-black' style={{ color: PRIMARY }}>{value}</span>
              <span className='text-[10px] font-medium text-gray-400'>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='h-2' style={{ background: BG_PAGE }} />

      {/* ── Carousel ── */}
      <div className='bg-white py-4'>
        <HeroCarousel />
      </div>

      <div className='h-2' style={{ background: BG_PAGE }} />

      {/* ── Testimonial ── */}
      <div className='relative mx-4 overflow-hidden rounded-2xl'>
        <div style={{ aspectRatio: '16/9' }} className='relative w-full'>
          <img
            src='/images/event/whatsapp-quote/testimonial.jpeg'
            alt='K-DOC 상담 후기'
            className='h-full w-full object-cover'
          />
        </div>
        <div className='absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4'>
          <span className='mb-2 inline-block w-fit rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold text-white'>
            REAL REVIEW
          </span>
          <p className='text-[18px] font-black leading-snug text-white'>
            "3분 만에 견적을 받았어요!"
          </p>
          <p className='mt-1 text-[12px] text-white/70'>실제 K-DOC 이용 후기</p>
        </div>
      </div>

      <div className='h-2 mt-4' style={{ background: BG_PAGE }} />

      {/* ── How it works ── */}
      <div className='bg-white px-5 py-6'>
        <p className='mb-5 text-[11px] font-bold uppercase tracking-widest text-gray-400'>이용 방법</p>
        <div className='space-y-4'>
          {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
            <div key={step} className='flex items-start gap-4'>
              <div className='flex flex-col items-center'>
                <div
                  className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-black text-white'
                  style={{ background: PRIMARY }}
                >
                  {step}
                </div>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className='mt-1.5 h-5 w-px bg-gray-100' />
                )}
              </div>
              <div className='pt-1'>
                <p className='text-[14px] font-bold text-gray-900'>{title}</p>
                <p className='mt-0.5 text-[12px] text-gray-400'>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='h-2' style={{ background: BG_PAGE }} />

      {/* ── Body part selector ── */}
      <div className='bg-white px-5 py-6'>
        <div className='mb-4 flex items-end justify-between'>
          <div>
            <h2 className='text-[16px] font-black text-gray-900'>관심 부위</h2>
            <p className='mt-0.5 text-[12px] text-gray-400'>복수 선택 가능</p>
          </div>
          <AnimatePresence>
            {selectedParts.length > 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className='rounded-full px-3 py-1 text-[12px] font-bold'
                style={{ background: PRIMARY_LIGHT, color: PRIMARY }}
              >
                {selectedParts.length}개 선택
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className='grid grid-cols-4 gap-2.5'>
          {BODY_PARTS.map((part) => {
            const on = selectedParts.includes(part.id);
            return (
              <button
                key={part.id}
                onClick={() => togglePart(part.id)}
                className={cn(
                  'relative flex flex-col items-center gap-2 rounded-2xl py-4 transition-all duration-150 active:scale-95',
                  on ? 'bg-[#F3F0FF]' : 'bg-gray-50 hover:bg-gray-100',
                )}
              >
                {on && (
                  <span
                    className='absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full'
                    style={{ background: PRIMARY }}
                  >
                    <Check className='h-2.5 w-2.5 text-white' />
                  </span>
                )}
                <div className={cn('transition-opacity', on ? 'opacity-100' : 'opacity-50')}>
                  <part.Icon />
                </div>
                <span
                  className='text-[11px] font-bold'
                  style={{ color: on ? PRIMARY : '#6B7280' }}
                >
                  {part.label}
                </span>
              </button>
            );
          })}
        </div>

        {errors.parts && (
          <div className='mt-3 flex items-center gap-1.5'>
            <AlertCircle className='h-3.5 w-3.5 shrink-0 text-red-400' />
            <p className='text-xs text-red-400'>{errors.parts}</p>
          </div>
        )}
      </div>

      <div className='h-2' style={{ background: BG_PAGE }} />

      {/* ── Contact form ── */}
      <div className='space-y-5 bg-white px-5 py-6'>
        <div>
          <h2 className='text-[16px] font-black text-gray-900'>연락처</h2>
          <p className='mt-0.5 text-[12px] text-gray-400'>견적을 받을 WhatsApp 번호를 입력해주세요</p>
        </div>

        {/* WhatsApp number */}
        <div>
          <div className='flex gap-2'>
            <div ref={pickerRef} className='relative shrink-0'>
              <button
                onClick={() => setShowPicker(!showPicker)}
                className='flex h-12 items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3'
              >
                <span>{selectedCountry?.flag}</span>
                <span className='text-xs font-semibold text-gray-600'>{countryCode}</span>
                <ChevronDown className={cn('h-3 w-3 text-gray-400 transition-transform', showPicker && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {showPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.12 }}
                    className='absolute left-0 top-14 z-50 max-h-52 w-48 overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-xl'
                  >
                    {COUNTRY_CODES.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => { setCountryCode(c.code); setShowPicker(false); }}
                        className={cn(
                          'flex w-full items-center gap-2.5 px-3 py-2.5 text-sm hover:bg-gray-50',
                          countryCode === c.code && 'bg-[#F3F0FF]',
                        )}
                      >
                        <span>{c.flag}</span>
                        <span className='w-9 shrink-0 text-[11px] text-gray-400'>{c.code}</span>
                        <span className='truncate text-xs text-gray-600'>{c.name}</span>
                        {countryCode === c.code && (
                          <Check className='ml-auto h-3 w-3 shrink-0' style={{ color: PRIMARY }} />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <input
              type='tel'
              inputMode='numeric'
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((v) => ({ ...v, phone: undefined }));
              }}
              placeholder='번호 입력 (숫자만)'
              className={cn(
                'h-12 flex-1 rounded-xl border bg-gray-50 px-3 text-sm text-gray-800 placeholder-gray-300 outline-none transition-colors focus:bg-white',
                errors.phone
                  ? 'border-red-300 focus:border-red-400'
                  : 'border-gray-200 focus:border-[#6C5CE7]',
              )}
            />
          </div>
          {errors.phone && (
            <div className='mt-2 flex items-center gap-1.5'>
              <AlertCircle className='h-3.5 w-3.5 shrink-0 text-red-400' />
              <p className='text-xs text-red-400'>{errors.phone}</p>
            </div>
          )}
        </div>

        {/* Optional message */}
        <div>
          <button
            onClick={() => setShowMessage(!showMessage)}
            className='flex w-full items-center justify-between py-1'
          >
            <span className='text-[13px] font-semibold text-gray-600'>
              고민 추가{' '}
              <span className='font-normal text-gray-400'>(선택)</span>
            </span>
            <div className='flex items-center gap-2'>
              {message && (
                <span className='rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600'>
                  입력됨
                </span>
              )}
              <ChevronDown
                className='h-4 w-4 text-gray-400 transition-transform duration-200'
                style={{ transform: showMessage ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </div>
          </button>
          <AnimatePresence initial={false}>
            {showMessage && (
              <motion.div
                key='message'
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className='overflow-hidden'
              >
                <div className='pt-2'>
                  <textarea
                    value={message}
                    onChange={(e) => { if (e.target.value.length <= 400) setMessage(e.target.value); }}
                    placeholder='예) 코 끝이 뭉툭해서 자연스러운 코 성형을 원해요'
                    rows={3}
                    className='w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none transition-colors focus:border-[#6C5CE7] focus:bg-white'
                  />
                  <p className='mt-1 text-right text-[10px] text-gray-300'>{message.length}/400</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Consent */}
        <label className='flex cursor-pointer items-start gap-3'>
          <button
            type='button'
            onClick={() => {
              setConsent(!consent);
              if (errors.consent) setErrors((v) => ({ ...v, consent: undefined }));
            }}
            className={cn(
              'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all',
              consent ? 'border-0' : 'border-gray-200 bg-white',
            )}
            style={consent ? { background: PRIMARY } : undefined}
          >
            {consent && <Check className='h-3 w-3 text-white' />}
          </button>
          <span className='text-[12px] leading-relaxed text-gray-400'>
            개인정보 수집·이용에 동의합니다.{' '}
            <span className='underline underline-offset-2' style={{ color: PRIMARY }}>자세히 보기</span>
          </span>
        </label>
        {errors.consent && (
          <div className='flex items-center gap-1.5'>
            <AlertCircle className='h-3.5 w-3.5 shrink-0 text-red-400' />
            <p className='text-xs text-red-400'>{errors.consent}</p>
          </div>
        )}
      </div>

      {/* ── Floating CTA ── */}
      <div
        className='fixed bottom-0 left-1/2 z-50 w-full max-w-[500px] -translate-x-1/2 px-4 pb-6 pt-4'
        style={{ background: `linear-gradient(to top, ${BG_PAGE} 70%, transparent)` }}
      >
        <AnimatePresence mode='wait'>
          {showSuccess ? (
            <motion.div
              key='success'
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex h-14 items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50'
            >
              <Check className='h-4 w-4 text-emerald-500' />
              <span className='text-sm font-bold text-emerald-700'>WhatsApp이 실행됐어요!</span>
            </motion.div>
          ) : (
            <motion.button
              key='cta'
              onClick={handleSubmit}
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
              className='flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl font-bold text-white shadow-lg disabled:opacity-60'
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
            >
              {isSubmitting
                ? <div className='h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white' />
                : <MessageCircle className='h-5 w-5' />
              }
              <span className='text-[15px]'>
                {isSubmitting ? '연결 중...' : '무료 견적 받기'}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
