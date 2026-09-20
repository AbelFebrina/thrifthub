'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  initialRating?: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
}

export default function StarRating({ initialRating = 0, onRate, readonly = false }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [localRating, setLocalRating] = useState(initialRating);

  const handleClick = (rating: number) => {
    if (readonly) return;
    setLocalRating(rating);
    onRate?.(rating);
  };

  const displayRating = readonly ? localRating : hoverRating;

  return (
    <div className="flex gap-0.5" onMouseLeave={() => setHoverRating(0)}>
      {[1, 2, 3, 4, 5].map(star => {
        const isFilled = displayRating >= star;
        return (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            disabled={readonly}
            className={`transition-colors duration-150 ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
            onMouseEnter={() => !readonly && setHoverRating(star)}
            aria-label={`${star} bintang`}
          >
            <Star
              className={`h-6 w-6 transition-colors duration-150 ${
                isFilled ? 'fill-[#8a5a2b] text-[#8a5a2b]' : 'fill-transparent text-[#d4c4a8]'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

