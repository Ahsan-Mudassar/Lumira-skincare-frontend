import { Construction } from "lucide-react";
import EmptyState from "../components/ui/EmptyState";

export default function PlaceholderPage({ title }) {
  return (
    <div className="container-page py-20">
      <EmptyState icon={Construction} title={title} description="This page is coming in an upcoming phase." />
    </div>
  );
}
