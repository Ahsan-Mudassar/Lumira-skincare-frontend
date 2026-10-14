import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { SITE } from "../../constants/site";
import Logo from "./Logo";

const footerLinks = [
  { label: "Shop", to: ROUTES.shop },
  { label: "Track Order", to: ROUTES.trackOrder },
  { label: "Cart", to: ROUTES.cart },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line-soft bg-white">
      <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-xs flex-col gap-3">
          <Logo />
          <p className="text-sm text-body">{SITE.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-body transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line-soft">
        <p className="container-page py-5 text-sm text-muted">
          &copy; {new Date().getFullYear()} {SITE.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
