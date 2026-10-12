import { CircleAlert } from "lucide-react";
import { cn } from "../../lib/cn";
import Button from "./Button";

export default function ErrorState({ title = "Something went wrong", message, onRetry, className }) {
  return (
    <div role="alert" className={cn("flex flex-col items-center gap-3 px-6 py-12 text-center", className)}>
      <span className="flex size-14 items-center justify-center rounded-full bg-rose text-danger">
        <CircleAlert aria-hidden="true" className="size-6" />
      </span>
      <h3 className="text-xl">{title}</h3>
      {message && <p className="max-w-sm text-sm text-muted">{message}</p>}
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-2">
          Try again
        </Button>
      )}
    </div>
  );
}
