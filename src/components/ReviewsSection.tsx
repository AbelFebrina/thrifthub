'use client';

import { Star } from 'lucide-react';
import { Review } from '@/types';
import { formatRelativeTime } from '@/utils/date';

interface StarRatingProps {
  rating: number;
  size?: number;
  showCount?: boolean;
  count?: number;
  className?: string;
}

function StarRating({ rating, size = 16, showCount = false, count, className }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-1 ${className || ''}`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-${size} w-${size} ${
            i < Math.floor(rating)
              ? 'text-amber-400 fill-current'
              : i < rating
              ? 'text-amber-400 fill-current' // half star would need a different icon
              : 'text-neutral-300'
          }`}
          aria-hidden="true"
        />
      ))}
      {showCount && count && (
        <span className="text-sm font-medium text-neutral-700 ml-2">
          {rating.toFixed(1)} ({count})
        </span>
      )}
    </div>
  );
}

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
  productName: string;
}

export default function ReviewsSection({ reviews, averageRating, reviewCount, productName }: ReviewsSectionProps) {
  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage: reviewCount > 0 ? (reviews.filter(r => r.rating === stars).length / reviewCount) * 100 : 0,
  }));

  return (
    <section className="space-y-8">
      {/* Rating Summary */}
      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <div className="text-center md:text-left">
          <p className="font-display text-5xl font-bold text-neutral-900">{averageRating.toFixed(1)}</p>
          <StarRating rating={averageRating} size={24} showCount count={reviewCount} />
          <p className="mt-2 text-sm text-neutral-500">
            {reviewCount} ulasan untuk {productName}
          </p>
        </div>

        <div>
          {ratingDistribution.map(({ stars, count, percentage }) => (
            <div key={stars} className="mb-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-8 text-sm text-neutral-600">{stars}★</span>
                <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-12 text-sm text-neutral-500 text-right">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          <h3 className="font-display text-xl font-bold text-neutral-900">Ulasan Terbaru</h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-xl bg-neutral-50 border border-neutral-200 p-5"
              >
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold text-sm ${review.userAvatarBg}`}>
                    {review.userInitials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-neutral-900">{review.userName}</p>
                        {review.verifiedPurchase && (
                          <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
                            Verified
                          </span>
                        )}
                      </div>
                      <time className="text-sm text-neutral-500 whitespace-nowrap">
                        {formatRelativeTime(review.date)}
                      </time>
                    </div>
                    <StarRating rating={review.rating} size={14} className="mt-1" />
                    <p className="mt-3 text-neutral-700 leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Star className="h-16 w-16 mx-auto text-neutral-300" />
          <h3 className="mt-4 text-lg font-medium text-neutral-900">Belum ada ulasan</h3>
          <p className="mt-1 text-neutral-500">Jadilah yang pertama mengulas produk ini</p>
        </div>
      )}
    </section>
  );
}
