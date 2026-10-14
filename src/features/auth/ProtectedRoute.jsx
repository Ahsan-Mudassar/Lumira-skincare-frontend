import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import ErrorState from "../../components/ui/ErrorState";
import Spinner from "../../components/ui/Spinner";
import { useMe } from "./useAuth";

export default function ProtectedRoute() {
  const { data: admin, isPending, isError, error, refetch } = useMe();
  const location = useLocation();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center text-primary">
        <Spinner size="lg" label="Checking session" />
      </div>
    );
  }

  if (isError) {
    return <ErrorState message={error.message} onRetry={refetch} className="min-h-screen justify-center" />;
  }

  if (!admin) {
    return <Navigate to={ROUTES.admin.login} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
