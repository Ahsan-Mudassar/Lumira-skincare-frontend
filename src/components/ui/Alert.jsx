import { CircleAlert, CircleCheck, Headset, Info } from "lucide-react";
import { cn } from "../../lib/cn";

const styles = {
  info: { box: "bg-surface", icon: "bg-primary-light text-primary-dark", Icon: Info },
  success: { box: "bg-primary-light/50", icon: "bg-primary-light text-primary-dark", Icon: CircleCheck },
  notice: { box: "bg-rose/60", icon: "bg-rose text-accent", Icon: Headset },
  error: { box: "bg-rose", icon: "bg-white/60 text-danger", Icon: CircleAlert },
};

export default function Alert({ variant = "info", title, icon, className, children }) {
  const { box, icon: iconStyle, Icon: DefaultIcon } = styles[variant];
  const Icon = icon ?? DefaultIcon;

  return (
    <div role={variant === "error" ? "alert" : "status"} className={cn("flex gap-4 rounded-xl p-5", box, className)}>
      <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-full", iconStyle)}>
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <div className="flex flex-col gap-1 justify-center">
        {title && <p className="font-medium text-ink">{title}</p>}
        <div className="text-sm text-body">{children}</div>
      </div>
    </div>
  );
}