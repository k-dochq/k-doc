'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ConciergeServiceCard } from './ConciergeServiceCard';

const CARD_KEYS = [
  {
    imgKey: 'premium_top_1',
    line1Key: 'heroCard1Line1' as const,
    line2Key: 'heroCard1Line2' as const,
    overlayGradient:
      'linear-gradient(0deg, #0fe5e1 10%, rgba(15, 229, 225, 0.8) 30%, rgba(15, 229, 225, 0) 60%)',
  },
  {
    imgKey: 'premium_top_2',
    line1Key: 'heroCard2Line1' as const,
    line2Key: 'heroCard2Line2' as const,
    overlayGradient:
      'linear-gradient(0deg, #e5b62d 10%, rgba(229, 182, 45, 0.8) 30%, rgba(229, 182, 45, 0) 60%)',
  },
  {
    imgKey: 'premium_top_3',
    line1Key: 'heroCard3Line1' as const,
    line2Key: 'heroCard3Line2' as const,
    overlayGradient:
      'linear-gradient(0deg, #ea4df9 10%, rgba(234, 77, 249, 0.8) 30%, rgba(234, 77, 249, 0) 60%)',
  },
];

// sideOffset / cardWidth = 110 / 180 = 61.11% — 비율 고정이라 항상 동일
const SIDE_X = `${((110 / 180) * 100).toFixed(4)}%`;

function getCardAnimation(diff: number) {
  if (diff === 0) return { x: '0%', scale: 1, zIndex: 10 };
  if (diff === 1) return { x: SIDE_X, scale: 0.7, zIndex: 5 };
  return { x: `-${SIDE_X}`, scale: 0.7, zIndex: 5 };
}

interface ConciergeHeroCardsProps {
  lang: Locale;
  dict: Dictionary;
}

export function ConciergeHeroCards({ lang, dict }: ConciergeHeroCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = dict.concierge;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CARD_KEYS.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className='relative flex w-full items-center justify-center'
      style={{ aspectRatio: '335 / 192' }}
    >
      {CARD_KEYS.map((card, index) => {
        const diff = (index - currentIndex + CARD_KEYS.length) % CARD_KEYS.length;
        const anim = getCardAnimation(diff);
        const line1 = t[card.line1Key];
        const line2 = t[card.line2Key];

        return (
          <motion.div
            key={card.imgKey}
            className='absolute w-[53.73%]'
            animate={{ x: anim.x, scale: anim.scale, zIndex: anim.zIndex }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ConciergeServiceCard
              src={`/images/premium_package/${lang}/${card.imgKey}.png`}
              alt={`${line1} ${line2}`}
              line1={line1}
              line2={line2}
              overlayGradient={card.overlayGradient}
              className='bg-white'
            />
          </motion.div>
        );
      })}
    </div>
  );
}
