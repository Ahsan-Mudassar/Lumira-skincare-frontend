import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";
import IconButton from "./IconButton";

const sizes = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-2xl" };

export default function Modal({ open, onClose, title, description, children, footer, size = "md", className }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function handleBackdropClick(event) {
    if (event.target === dialogRef.current) onClose?.();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={title ? titleId : undefined}
      onClose={onClose}
      onClick={handleBackdropClick}
      className={cn(
        "m-auto w-[calc(100%-3rem)] rounded-xl bg-white p-0 text-body shadow-soft backdrop:bg-ink/40",
        sizes[size],
        className
      )}
    >
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 id={titleId} className="text-xl">
                {title}
              </h2>
            )}
            {description && <p className="mt-1 text-sm text-muted">{description}</p>}
          </div>
          <IconButton label="Close" size="sm" onClick={onClose}>
            <X />
          </IconButton>
        </div>
        {children}
        {footer && <div className="flex justify-end gap-3 pt-2">{footer}</div>}
      </div>
    </dialog>
  );
}
