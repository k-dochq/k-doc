'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { extractLocalizedText, formatDateSimple, getUserDisplayName } from 'shared/lib';
import { type ReviewCardData } from '../model/types';
import { Star, User, Calendar, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { ReviewLikeButton } from 'features/review-like/ui/ReviewLikeButton';

interface ReviewDetailCardProps {
  review: ReviewCardData;
  lang: Locale;
  dict: Dictionary;
}

export function ReviewDetailCard({ review, lang, dict }: ReviewDetailCardProps) {
  return <div>d</div>;
}
