import { cn } from "../../lib/cn";

export default function SectionHeading({ as: Tag = "h2", title, description, action, className }) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div>
        <Tag className="text-[22px] leading-snug md:text-4xl">{title}</Tag>
        {description && <p className="mt-2 text-base text-body">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
