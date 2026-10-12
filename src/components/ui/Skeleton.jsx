import { cn } from "../../lib/cn";

export default function Skeleton({ className }) {
  return (
    <div aria-hidden="true" className={cn("animate-pulse rounded-md bg-surface-alt motion-reduce:animate-none", className)} />
  );
}
