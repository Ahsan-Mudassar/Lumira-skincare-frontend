import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AdminLayout from "./components/layout/AdminLayout";
import PublicLayout from "./components/layout/PublicLayout";
import { ROUTES } from "./constants/routes";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminOrderDetailPage from "./pages/admin/AdminOrderDetailPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminProductFormPage from "./pages/admin/AdminProductFormPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminReviewsPage from "./pages/admin/AdminReviewsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ShopPage from "./pages/ShopPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import { queryClient } from "./services/queryClient";
import { store } from "./store/store";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: ROUTES.home, element: <HomePage /> },
      { path: ROUTES.shop, element: <ShopPage /> },
      { path: "/products/:slug", element: <ProductDetailsPage /> },
      { path: ROUTES.cart, element: <CartPage /> },
      { path: ROUTES.checkout, element: <CheckoutPage /> },
      { path: ROUTES.orderSuccess, element: <OrderSuccessPage /> },
      { path: ROUTES.trackOrder, element: <TrackOrderPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  { path: ROUTES.admin.login, element: <AdminLoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: ROUTES.admin.dashboard, element: <AdminDashboardPage /> },
          { path: ROUTES.admin.orders, element: <AdminOrdersPage /> },
          { path: "/admin/orders/:id", element: <AdminOrderDetailPage /> },
          { path: ROUTES.admin.products, element: <AdminProductsPage /> },
          { path: ROUTES.admin.productNew, element: <AdminProductFormPage /> },
          { path: "/admin/products/:id/edit", element: <AdminProductFormPage /> },
          { path: ROUTES.admin.categories, element: <AdminCategoriesPage /> },
          { path: ROUTES.admin.reviews, element: <AdminReviewsPage /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          toastOptions={{
            style: { background: "#ffffff", color: "#1c1c19", borderRadius: "12px", boxShadow: "0 8px 24px rgb(79 111 82 / 0.12)" },
            iconTheme: { primary: "#44664a", secondary: "#ffffff" },
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}
