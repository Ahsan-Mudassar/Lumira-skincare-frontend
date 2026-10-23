import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { ROUTES } from "../../constants/routes";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Spinner from "../../components/ui/Spinner";
import Logo from "../../components/layout/Logo";
import { useLogin, useMe } from "../../features/auth/useAuth";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

export default function AdminLoginPage() {
  const { data: admin, isPending } = useMe();
  const login = useLogin();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname ?? ROUTES.admin.dashboard;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center text-primary">
        <Spinner size="lg" label="Loading" />
      </div>
    );
  }
  if (admin) return <Navigate to={redirectTo} replace />;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-10">
      <Logo to={ROUTES.home} />
      <Card className="w-full max-w-md" padding="lg">
        <h1 className="text-2xl">Admin sign in</h1>
        <p className="mt-1 text-sm text-muted">Sign in to manage orders, products and reviews.</p>
        <form onSubmit={handleSubmit((values) => login.mutate(values))} noValidate className="mt-6 flex flex-col gap-4">
          {login.isError && <Alert variant="error">{login.error?.status?.message}</Alert>}
          <Input label="Email" type="email" autoComplete="username" tone="surface" placeholder="Enter admin email" error={errors.email?.message} {...register("email")} />
          <Input label="Password" type="password" placeholder="Enter admin password" autoComplete="current-password" tone="surface" error={errors.password?.message} {...register("password")} />
          <Button type="submit" size="lg" varient="primary" loading={login.isPending} className="cursor-pointer">
            Sign in
          </Button>
        </form>
      </Card>
      <Link to={ROUTES.home} className="text-sm text-muted hover:text-primary">
        Back to store
      </Link>
    </div>
  );
}
