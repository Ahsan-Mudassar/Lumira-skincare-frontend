import { cn } from "../../lib/cn";

export default function SectionHeading({ as: Tag = "h2", title, description, action, className }) {
  return (
    <div className={cn("sm:flex lg:flex sm:justify-between md:justify-between lg:justify-between", className)}>
      <div>
        <Tag className="text-[22px] leading-snug md:text-4xl ">{title}</Tag>
        {description && <p className="mt-2 text-base text-body mb-3">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
