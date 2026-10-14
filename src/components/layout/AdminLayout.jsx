import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Drawer from "./Drawer";
import Logo from "./Logo";
import IconButton from "../ui/IconButton";
import { ROUTES } from "../../constants/routes";

const ADMIN_MENU_ID = "admin-menu";

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-cream lg:flex">
      <aside className="hidden w-64 shrink-0 p-4 lg:block">
        <div className="sticky top-4 h-[calc(100vh-2rem)] rounded-xl bg-cream-alt p-5">
          <AdminSidebar />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line-soft bg-cream/90 px-4 backdrop-blur lg:hidden">
          <Logo to={ROUTES.admin.dashboard} className="text-lg tracking-[0.15em]" />
          <IconButton label="Open menu" aria-expanded={menuOpen} aria-controls={ADMIN_MENU_ID} onClick={() => setMenuOpen(true)}>
            <Menu />
          </IconButton>
        </header>

        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>

      <Drawer open={menuOpen} onClose={closeMenu} id={ADMIN_MENU_ID} title="Admin menu" header={<span className="font-medium text-ink">Admin</span>}>
        <AdminSidebar onNavigate={closeMenu} />
      </Drawer>
    </div>
  );
}
