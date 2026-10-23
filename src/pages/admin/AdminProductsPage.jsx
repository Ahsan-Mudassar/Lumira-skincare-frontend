import { Boxes, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { formatPrice } from "../../lib/formatPrice";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";
import IconButton from "../../components/ui/IconButton";
import Pagination from "../../components/ui/Pagination";
import SectionHeading from "../../components/ui/SectionHeading";
import Skeleton from "../../components/ui/Skeleton";
import Switch from "../../components/ui/Switch";
import Table, { TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "../../components/ui/Table";
import { useAdminProducts, useDeleteProduct, useUpdateProduct } from "../../features/admin/products/hooks";
import StockModal from "../../features/admin/products/StockModal";
import { getProductImage } from "../../features/products/productUtils";
import { useCategories } from "../../features/categories/useCategories";

export default function AdminProductsPage() {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page")) || 1;
  const { data, isPending, isError, error, refetch } = useAdminProducts({ page, limit: 20 });
  const { data: categories } = useCategories();

  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const [stockFor, setStockFor] = useState(null);
  const [deleteFor, setDeleteFor] = useState(null);

  function toggleActive(product, isActive) {
    updateProduct.mutate(
      { id: product._id, body: { isActive } },
      {
        onSuccess: () => toast.success(isActive ? "Product activated" : "Product hidden from store"),
        onError: (err) => toast.error(err.message),
      }
    );
  }

  function confirmDelete() {
    deleteProduct.mutate(deleteFor._id, {
      onSuccess: () => {
        toast.success("Product removed from the store");
        setDeleteFor(null);
      },
      onError: (err) => {
        toast.error(err.message);
        setDeleteFor(null);
      },
    });
  }

  function getCategoryName(product) {
    const category = categories.find((item) => item._id === product.category)
    return category?.name
  }

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        as="h1"
        title="Products"
        description="Manage your catalog, prices and stock."
        action={
          <Button as={Link} to={ROUTES.admin.productNew}>
            <Plus aria-hidden="true" className="size-4" />
            Add product
          </Button>
        }
      />

      <Card tone="muted" padding="sm">
        {isPending ? (
          <Skeleton className="h-64 w-full" />
        ) : isError ? (
          <ErrorState message={error.message} onRetry={refetch} />
        ) : data.products.length === 0 ? (
          <EmptyState title="No products yet" description="Add your first product to start selling." action={<Button as={Link} to={ROUTES.admin.productNew}>Add product</Button>} />
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>Product</TableHeadCell>
                  <TableHeadCell>Category</TableHeadCell>
                  <TableHeadCell>Price</TableHeadCell>
                  <TableHeadCell>Stock</TableHeadCell>
                  <TableHeadCell>Active</TableHeadCell>
                  <TableHeadCell className="text-right">Actions</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.products.data.map((product) => {
                  const image = getProductImage(product);
                  const active = product.isActive !== false;
                  return (
                    <TableRow key={product._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {image ? <img src={image} alt="" className="size-11 rounded-md object-cover" /> : <div aria-hidden="true" className="size-11 rounded-md bg-surface" />}
                          <div>
                            <p className="font-medium text-ink">{product.name}</p>
                            <p className="text-xs text-muted">{product.sku}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getCategoryName(product) ?? ""}</TableCell>
                      <TableCell>
                        <span className="font-medium text-ink">{formatPrice(product.discountPrice ?? product.price)}</span>
                        {product.discountPrice != null && product.discountPrice < product.price && <del className="ml-2 text-xs text-muted">{formatPrice(product.price)}</del>}
                      </TableCell>
                      <TableCell>
                        {product.inStock == null ? <span className="text-muted">-</span> : product.inStock === 0 ? <Badge variant="danger" size="sm">Out</Badge> : product.inStock}
                      </TableCell>
                      <TableCell>
                        <Switch label={`${product.name} active`} checked={active} onChange={(value) => toggleActive(product, value)} disabled={updateProduct.isPending} />
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <IconButton
                            label={`Update stock for ${product.name}`}
                            size="sm"
                            onClick={() => setStockFor(product)}>
                            <Boxes />
                          </IconButton>
                          <IconButton
                            as={Link}
                            to={ROUTES.admin.productEdit(product._id)}
                            label={`Edit ${product.name}`} size="sm">
                            <Pencil />
                          </IconButton>
                          <IconButton
                            label={`Remove ${product.name}`}
                            size="sm"
                            onClick={() => setDeleteFor(product)}>
                            <Trash2 className="text-danger" />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Pagination className="mt-4" page={data.pagination?.page ?? page} totalPages={data.pagination?.totalPages} onPageChange={(next) => setParams({ page: String(next) })} />
          </>
        )}
      </Card>

      {stockFor && <StockModal product={stockFor} onClose={() => setStockFor(null)} />}
      <ConfirmDialog
        open={Boolean(deleteFor)}
        onClose={() => setDeleteFor(null)}
        onConfirm={confirmDelete}
        loading={deleteProduct.isPending}
        danger
        title="Remove this product?"
        message={`${deleteFor?.name ?? "This product"} will be hidden from the store. You can activate it again later.`}
        confirmLabel="Remove"
      />
    </div>
  );
}
