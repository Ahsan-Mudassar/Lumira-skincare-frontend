import { useState } from "react";
import { Menu, ShoppingCart } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../../constants/routes";
import { NAV_LINKS } from "../../constants/site";
import { selectCartCount } from "../../features/cart/cartSelectors";
import { cn } from "../../lib/cn";
import IconButton from "../ui/IconButton";
import Logo from "./Logo";
import MobileMenu, { MOBILE_MENU_ID } from "./MobileMenu";
import SearchForm from "./SearchForm";

const navLinkClass = ({ isActive }) =>
  cn(
    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    isActive ? "bg-primary text-white" : "text-ink hover:bg-surface"
  );

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useSelector(selectCartCount);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line-soft bg-white backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <Logo />
            <nav aria-label="Main" className="hidden md:block">
              <ul className="flex items-center gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <NavLink to={link.to} end={link.end} className={navLinkClass}>
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <SearchForm className="hidden w-64 lg:block" />
            <IconButton
              as={Link}
              to={ROUTES.cart}
              label={cartCount > 0 ? `Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}` : "Cart"}
              className="relative"
            >
              <ShoppingCart />
              {cartCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-100 px-1 text-xs font-medium text-green-500"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </IconButton>
            <IconButton
              label="Open menu"
              aria-expanded={menuOpen}
              aria-controls={MOBILE_MENU_ID}
              onClick={() => setMenuOpen(true)}
              className="md:hidden"
            >
              <Menu />
            </IconButton>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
