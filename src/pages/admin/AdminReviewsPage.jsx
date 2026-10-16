import { BadgeCheck, Check, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { formatDate } from "../../lib/formatDate";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";
import Pagination from "../../components/ui/Pagination";
import RatingStars from "../../components/ui/RatingStars";
import SectionHeading from "../../components/ui/SectionHeading";
import SegmentedControl from "../../components/ui/SegmentedControl";
import Select from "../../components/ui/Select";
import Skeleton from "../../components/ui/Skeleton";
import { useAdminReviews, useDeleteReview, useSetReviewApproval } from "../../features/admin/reviews/hooks";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "all", label: "All" },
];

export default function AdminReviewsPage() {
  const [params, setParams] = useSearchParams();
  const status = params.get("status") ?? "pending";
  const rating = params.get("rating") ?? "";
  const page = Number(params.get("page")) || 1;

  const { data, isPending, isError, error, refetch } = useAdminReviews({ status, rating, page, limit: 20 });

  const approval = useSetReviewApproval();
  const remove = useDeleteReview();
  const [deleteFor, setDeleteFor] = useState(null);

  function update(patch) {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(patch)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    if (!("page" in patch)) next.delete("page");
    setParams(next);
  }

  function setApproved(review, isApproved) {
    approval.mutate(
      { id: review._id, isApproved },
      {
        onSuccess: () => toast.success(isApproved ? "Review approved" : "Review hidden"),
        onError: (err) => toast.error(err.message),
      }
    );
  }

  function confirmDelete() {
    remove.mutate(deleteFor._id, {
      onSuccess: () => toast.success("Review deleted"),
      onError: (err) => toast.error(err.message),
      onSettled: () => setDeleteFor(null),
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading as="h1" title="Reviews" description="Approve, hide or delete customer reviews." />

      <div className="flex flex-wrap items-center gap-3">
        <SegmentedControl label="Review status" options={STATUS_OPTIONS} value={status} onChange={(value) => update({ status: value === "pending" ? "" : value })} />
        <Select variant="pill" aria-label="Filter by rating" value={rating} onChange={(e) => update({ rating: e.target.value })}>
          <option value="">Rating: All</option>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>{n} stars</option>
          ))}
        </Select>
      </div>

      {isPending ? (
        <Skeleton className="h-64 w-full" />
      ) : isError ? (
        <ErrorState message={error.message} onRetry={refetch} />
      ) : data.reviews.length === 0 ? (
        <EmptyState title="No reviews here" description={status === "pending" ? "No reviews are waiting for approval." : "Nothing matches these filters."} />
      ) : (
        <>
          <ul className="flex flex-col gap-4">
            {data.reviews.data.map((review) => (
              <li key={review._id}>
                <Card tone="muted" className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <RatingStars value={review.rating} variant="stars" />
                      <Badge variant={review.isApproved ? "success" : "warning"} size="sm">{review.isApproved ? "Approved" : "Pending"}</Badge>
                      {review.isVerifiedPurchase && (
                        <span className="inline-flex items-center gap-1 text-xs text-primary">
                          <BadgeCheck aria-hidden="true" className="size-4" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted">{formatDate(review.createdAt)}</p>
                  </div>
                  <p className="text-sm text-muted">
                    {review.product?.name ?? review.productName ?? "Product"} &middot; {review.displayName ?? review.customerName ?? review.customer?.name ?? "Customer"}
                  </p>
                  {review.title && <p className="font-medium text-ink">{review.title}</p>}
                  <p className="text-body">{review.comment}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {review.isApproved ? (
                      <Button variant="outline" size="sm" onClick={() => setApproved(review, false)} disabled={approval.isPending}>
                        <EyeOff aria-hidden="true" className="size-4" />
                        Hide
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => setApproved(review, true)} disabled={approval.isPending}>
                        <Check aria-hidden="true" className="size-4" />
                        Approve
                      </Button>
                    )}
                    <Button variant="dangerGhost" size="sm" onClick={() => setDeleteFor(review)}>
                      <Trash2 aria-hidden="true" className="size-4" />
                      Delete
                    </Button>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
          <Pagination page={data.pagination?.page ?? page} totalPages={data.pagination?.totalPages} onPageChange={(next) => update({ page: String(next) })} />
        </>
      )}

      <ConfirmDialog
        open={Boolean(deleteFor)}
        onClose={() => setDeleteFor(null)}
        onConfirm={confirmDelete}
        loading={remove.isPending}
        danger
        title="Delete this review?"
        message="This permanently removes the review and updates the product rating."
        confirmLabel="Delete"
      />
    </div>
  );
}
