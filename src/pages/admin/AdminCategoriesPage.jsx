import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";
import IconButton from "../../components/ui/IconButton";
import SectionHeading from "../../components/ui/SectionHeading";
import Skeleton from "../../components/ui/Skeleton";
import Table, { TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "../../components/ui/Table";
import CategoryFormModal from "../../features/admin/categories/CategoryFormModal";
import { useDeleteCategory } from "../../features/admin/categories/hooks";
import { useCategories } from "../../features/categories/useCategories";

export default function AdminCategoriesPage() {
  const { data: categories, isPending, isError, error, refetch } = useCategories();
  const remove = useDeleteCategory();
  const [editing, setEditing] = useState(null); 
  const [deleteFor, setDeleteFor] = useState(null);
  
  function confirmDelete() {
    remove.mutate(deleteFor._id, {
      onSuccess: () => toast.success("Category deleted"),
      onError: (err) => toast.error(err?.status?.message),
      onSettled: () => setDeleteFor(null),
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        as="h1"
        title="Categories"
        description="Group your products into collections."
        action={
          <Button onClick={() => setEditing({})}>
            <Plus aria-hidden="true" className="size-4" />
            Add category
          </Button>
        }
      />

      <Card tone="muted" padding="sm">
        {isPending ? (
          <Skeleton className="h-48 w-full" />
        ) : isError ? (
          <ErrorState message={error.message} onRetry={refetch} />
        ) : categories.length === 0 ? (
          <EmptyState title="No categories yet" action={<Button onClick={() => setEditing({})}>Add category</Button>} />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>Category</TableHeadCell>
                <TableHeadCell>Slug</TableHeadCell>
                <TableHeadCell>Products</TableHeadCell>
                <TableHeadCell className="text-right">Actions</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => {
                const image = typeof category.image === "string" ? category.image : category.image?.url;
                return (
                  <TableRow key={category._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {image ? <img src={image} alt="" className="size-11 rounded-md object-cover" /> : <div aria-hidden="true" className="size-11 rounded-md bg-surface" />}
                        <span className="font-medium text-ink">{category.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted">{category.slug}</TableCell>
                    <TableCell>{category.productCount ?? 0}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <IconButton label={`Edit ${category.name}`} size="sm" onClick={() => setEditing(category)}><Pencil /></IconButton>
                        <IconButton label={`Delete ${category.name}`} size="sm" onClick={()=>setDeleteFor(category)}><Trash2 className="text-danger" /></IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Card>

      {editing && <CategoryFormModal key={editing._id ?? "new"} category={editing._id ? editing : undefined} onClose={() => setEditing(null)} />}
      <ConfirmDialog
        open={Boolean(deleteFor)}
        onClose={() => setDeleteFor(null)}
        onConfirm={confirmDelete}
        loading={remove.isPending}
        danger
        title="Delete this category?"
        message="Categories that still contain products cannot be deleted."
        confirmLabel="Delete"
      />
    </div>
  );
}
