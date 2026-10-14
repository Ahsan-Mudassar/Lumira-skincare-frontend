import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../../constants/routes";
import { NAV_LINKS } from "../../constants/site";
import { selectCartCount } from "../../features/cart/cartSelectors";
import { cn } from "../../lib/cn";
import Drawer from "./Drawer";
import Logo from "./Logo";
import SearchForm from "./SearchForm";

export const MOBILE_MENU_ID = "mobile-menu";

const linkClass = ({ isActive }) =>
  cn(
    "flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors",
    isActive ? "bg-primary text-white" : "text-ink hover:bg-surface"
  );

export default function MobileMenu({ open, onClose }) {
  const cartCount = useSelector(selectCartCount);
  const links = [...NAV_LINKS, { label: "Cart", to: ROUTES.cart }];

  return (
    <Drawer open={open} onClose={onClose} id={MOBILE_MENU_ID} title="Menu" header={<Logo onClick={onClose} />}>
      <div className="flex flex-col gap-6">
        <SearchForm onSearched={onClose} />
        <nav aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end} onClick={onClose} className={linkClass}>
                  {link.label}
                  {link.to === ROUTES.cart && cartCount > 0 && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-white">{cartCount}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Drawer>
  );
}
