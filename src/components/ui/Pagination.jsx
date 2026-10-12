import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";
import Button from "./Button";

export default function Pagination({ page, totalPages, onPageChange, className }) {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-4", className)}>
      <Button variant="secondary" size="sm" pill disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        <ChevronLeft aria-hidden="true" className="size-4" />
        Previous
      </Button>
      <span className="text-sm text-muted" aria-current="page">
        Page {page} of {totalPages}
      </span>
      <Button variant="secondary" size="sm" pill disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        Next
        <ChevronRight aria-hidden="true" className="size-4" />
      </Button>
    </nav>
  );
}
