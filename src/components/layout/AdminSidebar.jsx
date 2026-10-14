import { Layers, LayoutDashboard, LogOut, MessageSquare, Package, ReceiptText, Store } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useLogout } from "../../features/auth/useAuth";
import { cn } from "../../lib/cn";
import Button from "../ui/Button";
import Logo from "./Logo";

const ADMIN_LINKS = [
  { label: "Dashboard", to: ROUTES.admin.dashboard, icon: LayoutDashboard, end: true },
  { label: "Products", to: ROUTES.admin.products, icon: Package },
  { label: "Orders", to: ROUTES.admin.orders, icon: ReceiptText },
  { label: "Categories", to: ROUTES.admin.categories, icon: Layers },
  { label: "Reviews", to: ROUTES.admin.reviews, icon: MessageSquare },
];

const linkClass = ({ isActive }) =>
  cn(
    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
    isActive ? "bg-primary text-white" : "text-ink hover:bg-surface"
  );

export default function AdminSidebar({ onNavigate }) {
  const logout = useLogout();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout.mutateAsync();
    } catch {
      /* backend fail bhi ho to onSettled session saaf kar deta hai */
    }
    navigate(ROUTES.admin.login, { replace: true });
  }

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex items-center gap-2">
        <Logo to={ROUTES.admin.dashboard} className="text-lg tracking-[0.15em]" onClick={onNavigate} />
        <span className="rounded-full bg-primary-light px-2 py-0.5 text-xs font-medium text-primary-dark">Admin</span>
      </div>

      <nav aria-label="Admin">
        <ul className="flex flex-col gap-1">
          {ADMIN_LINKS.map(({ label, to, icon: Icon, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} onClick={onNavigate} className={linkClass}>
                <Icon aria-hidden="true" className="size-4" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto flex flex-col gap-1 border-t border-line-soft pt-4">
        <Button as={NavLink} to={ROUTES.home} variant="ghost" className="justify-start" onClick={onNavigate}>
          <Store aria-hidden="true" className="size-4" />
          View store
        </Button>
        <Button variant="dangerGhost" className="justify-start" onClick={handleLogout} loading={logout.isPending}>
          <LogOut aria-hidden="true" className="size-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
