import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

export default function NotFoundPage() {
  return (
    <div className="container-page py-20">
      <EmptyState
        title="Page not found"
        description="The page you are looking for does not exist or has moved."
        action={
          <Button as={Link} to={ROUTES.home}>
            Back to home
          </Button>
        }
      />
    </div>
  );
}
