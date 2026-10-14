import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { SITE } from "../../constants/site";
import { cn } from "../../lib/cn";

export default function Logo({ to = ROUTES.home, className, ...props }) {
  return (
    <Link
      to={to}
      aria-label={`${SITE.fullName} home`}
      className={cn(
        "rounded-md font-serif text-2xl font-bold tracking-[0.2em] text-primary-dark",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className
      )}
      {...props}
    >
      <img
        src="/logo.png"
        alt="Lumira logo"
        className="h-10"
      />
    </Link>
  );
}
