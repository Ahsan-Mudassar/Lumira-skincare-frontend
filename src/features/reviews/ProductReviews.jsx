import { BadgeCheck } from "lucide-react";
import { useState } from "react";
import { REVIEW_SORT_OPTIONS } from "../../constants/product";
import { formatDate } from "../../lib/formatDate";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";
import RatingStars from "../../components/ui/RatingStars";
import SectionHeading from "../../components/ui/SectionHeading";
import Select from "../../components/ui/Select";
import Skeleton from "../../components/ui/Skeleton";
import { useProductReviews } from "../products/useProducts";
import ReviewForm from "./ReviewForm";

function RatingSummary({ summary }) {
  const distribution = summary.distribution ?? {};
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
      <div className="flex flex-col items-start gap-1">
        <p className="text-4xl font-semibold text-ink">{Number(summary.average ?? 0).toFixed(1)}</p>
        <RatingStars value={summary.average} variant="stars" />
        <p className="text-sm text-muted">{summary.count} reviews</p>
      </div>
      <ul className="flex flex-1 flex-col gap-1.5" aria-label="Rating breakdown">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = distribution[star] ?? 0;
          const percent = summary.count ? (count / summary.count) * 100 : 0;
          return (
            <li key={star} className="flex items-center gap-3 text-sm">
              <span className="w-12 text-body">{star} star</span>
              <span aria-hidden="true" className="h-2 flex-1 overflow-hidden rounded-full bg-surface-alt">
                <span className="block h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
              </span>
              <span className="w-8 text-right text-muted">{count}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function ProductReviews({ product }) {
  const [sort, setSort] = useState("newest");
  const [formOpen, setFormOpen] = useState(false);
  const { data, isPending, isError, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProductReviews(product.slug, sort);

  const summary = data?.pages[0]?.summary;
  const reviews = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-24 border-t border-line-soft pt-12">
      <SectionHeading
        id="reviews-title"
        title="Customer Reviews"
        action={
          <Button variant="outline" size="sm" onClick={() => setFormOpen((open) => !open)} aria-expanded={formOpen}>
            {formOpen ? "Close form" : "Write a review"}
          </Button>
        }
      />

      {formOpen && (
        <Card tone="surface" className="mt-6">
          <ReviewForm productId={product._id} productSlug={product.slug} onDone={() => setFormOpen(false)} />
        </Card>
      )}

      <div className="mt-8 flex flex-col gap-8">
        {isPending ? (
          <Skeleton className="h-32 w-full" />
        ) : isError ? (
          <ErrorState message={error.message} onRetry={refetch} />
        ) : reviews.length === 0 ? (
          <EmptyState title="No reviews yet" description="Be the first to share your experience after your order arrives." />
        ) : (
          <>
            {summary && <RatingSummary summary={summary} />}
            <Select variant="pill" aria-label="Sort reviews" value={sort} onChange={(e) => setSort(e.target.value)} className="self-start">
              {REVIEW_SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  Sort: {option.label}
                </option>
              ))}
            </Select>
            <ul className="flex flex-col divide-y divide-line-soft">
              {reviews.map((review) => (
                <li key={review._id} className="flex flex-col gap-2 py-5 first:pt-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <RatingStars value={review.rating} variant="stars" />
                    {review.isVerifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-xs text-primary">
                        <BadgeCheck aria-hidden="true" className="size-4" />
                        Verified purchase
                      </span>
                    )}
                  </div>
                  {review.title && <p className="font-medium text-ink">{review.title}</p>}
                  <p className="text-body">{review.comment}</p>
                  <p className="text-sm text-muted">
                    {review.displayName} &middot; {formatDate(review.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
            {hasNextPage && (
              <Button variant="secondary" pill loading={isFetchingNextPage} onClick={() => fetchNextPage()} className="self-center">
                Load more reviews
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
