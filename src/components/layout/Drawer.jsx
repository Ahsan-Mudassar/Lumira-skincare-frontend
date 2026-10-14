import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";
import IconButton from "../ui/IconButton";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Drawer({ open, onClose, title, id, header, children, className }) {
  const panelRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => panel?.querySelector(FOCUSABLE)?.focus());

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusable = panel.querySelectorAll(FOCUSABLE);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  return (
    <div
      inert={!open}
      className={cn(
        "fixed inset-0 z-50",
        open ? "visible" : "invisible transition-[visibility] delay-300 motion-reduce:transition-none"
      )}
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn("absolute inset-0 bg-ink/40 transition-opacity duration-300 motion-reduce:transition-none", open ? "opacity-100" : "opacity-0")}
      />
      <aside
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col bg-cream shadow-soft transition-transform duration-300 motion-reduce:transition-none",
          open ? "translate-x-0" : "translate-x-full",
          className
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line-soft px-5">
          {header}
          <IconButton label="Close menu" onClick={onClose}>
            <X />
          </IconButton>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </aside>
    </div>
  );
}
