import { cn } from "../../lib/cn";

export default function FormField({ id, label, error, hint, required, className, children }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={id} className="text-base text-body">
          {label}
          {required && (
            <span aria-hidden="true" className="text-danger">
              {" "}
              *
            </span>
          )}
        </label>
      )}
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
