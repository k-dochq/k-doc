'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { type Locale } from 'shared/config';
import { ConciergeServiceCard } from './ConciergeServiceCard';

const CARD_META = [
  {
    key: 'premium_top_1',
    alt: 'VIP Transportation',
    line1: 'VIP',
    line2: 'Transportation',
    overlayGradient:
      'linear-gradient(0deg, #0fe5e1 10%, rgba(15, 229, 225, 0.8) 30%, rgba(15, 229, 225, 0) 60%)',
  },
  {
    key: 'premium_top_2',
    alt: 'Medical Interpreter',
    line1: 'Medical',
    line2: 'Interpreter',
    overlayGradient:
      'linear-gradient(0deg, #e5b62d 10%, rgba(229, 182, 45, 0.8) 30%, rgba(229, 182, 45, 0) 60%)',
  },
  {
    key: 'premium_top_3',
    alt: 'K-DOC Recovery Care',
    line1: 'K-DOC',
    line2: 'Recovery Care',
    overlayGradient:
      'linear-gradient(0deg, #ea4df9 10%, rgba(234, 77, 249, 0.8) 30%, rgba(234, 77, 249, 0) 60%)',
  },
] as const;

// sideOffset / cardWidth = 110 / 180 = 61.11% — 비율 고정이라 항상 동일
const SIDE_X = `${((110 / 180) * 100).toFixed(4)}%`;

function getCardAnimation(diff: number) {
  if (diff === 0) return { x: '0%', scale: 1, zIndex: 10 };
  if (diff === 1) return { x: SIDE_X, scale: 0.7, zIndex: 5 };
  return { x: `-${SIDE_X}`, scale: 0.7, zIndex: 5 };
}

interface ConciergeHeroCardsProps {
  lang: Locale;
}

export function ConciergeHeroCards({ lang }: ConciergeHeroCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CARD_META.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className='relative flex w-full items-center justify-center'
      style={{ aspectRatio: '335 / 192' }}
    >
      {CARD_META.map((card, index) => {
        const diff = (index - currentIndex + CARD_META.length) % CARD_META.length;
        const anim = getCardAnimation(diff);

        return (
          <motion.div
            key={card.alt}
            className='absolute w-[53.73%]'
            animate={{ x: anim.x, scale: anim.scale, zIndex: anim.zIndex }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ConciergeServiceCard
              src={`/images/premium_package/${lang}/${card.key}.png`}
              alt={card.alt}
              line1={card.line1}
              line2={card.line2}
              overlayGradient={card.overlayGradient}
              className='bg-white'
            />
          </motion.div>
        );
      })}
    </div>
  );
}
