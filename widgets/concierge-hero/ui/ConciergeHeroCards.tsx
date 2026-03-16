'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ConciergeServiceCard } from './ConciergeServiceCard';

const CARDS = [
  {
    src: '/images/concierge/section1-card-vip.jpg',
    alt: 'VIP Transportation',
    line1: 'VIP',
    line2: 'Transportation',
    overlayGradient:
      'linear-gradient(0deg, #0fe5e1 10%, rgba(15, 229, 225, 0.8) 30%, rgba(15, 229, 225, 0) 60%)',
  },
  {
    src: '/images/concierge/section1-card-interpreter.jpg',
    alt: 'Medical Interpreter',
    line1: 'Medical',
    line2: 'Interpreter',
    overlayGradient:
      'linear-gradient(0deg, #e5b62d 10%, rgba(229, 182, 45, 0.8) 30%, rgba(229, 182, 45, 0) 60%)',
  },
  {
    src: '/images/concierge/section1-card-recovery.jpg',
    alt: 'K-DOC Recovery Care',
    line1: 'K-DOC',
    line2: 'Recovery Care',
    overlayGradient:
      'linear-gradient(0deg, #ea4df9 10%, rgba(234, 77, 249, 0.8) 30%, rgba(234, 77, 249, 0) 60%)',
  },
] as const;

const SIDE_OFFSET = 110;

function getCardAnimation(diff: number) {
  if (diff === 0) {
    return { x: 0, scale: 1, zIndex: 10 };
  } else if (diff === 1) {
    return { x: SIDE_OFFSET, scale: 0.7, zIndex: 5 };
  } else {
    return { x: -SIDE_OFFSET, scale: 0.7, zIndex: 5 };
  }
}

export function ConciergeHeroCards() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CARDS.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative flex h-full w-full items-center justify-center'>
      {CARDS.map((card, index) => {
        const total = CARDS.length;
        const diff = (index - currentIndex + total) % total;
        const anim = getCardAnimation(diff);

        return (
          <motion.div
            key={card.alt}
            className='absolute'
            animate={{
              x: anim.x,
              scale: anim.scale,
              zIndex: anim.zIndex,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            <ConciergeServiceCard
              src={card.src}
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
