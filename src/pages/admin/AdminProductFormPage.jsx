import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";
import Skeleton from "../../components/ui/Skeleton";
import { buildProductFormData, buildProductUpdate } from "../../features/admin/products/api";
import { useAdminProducts, useCreateProduct, useUpdateProduct } from "../../features/admin/products/hooks";
import ProductForm from "../../features/admin/products/ProductForm";
import { useCategories } from "../../features/categories/useCategories";
import { useProduct } from "../../features/products/useProducts";

export default function AdminProductFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const categories = useCategories();
  const list = useAdminProducts({ limit: 50 });
  const create = useCreateProduct();
  const update = useUpdateProduct();

  const listItem = isEdit ? list.data?.products.data?.find((item) => item._id === id) : undefined;
  const detail = useProduct(listItem?.slug);

  const product = listItem ?? { ...(detail.data ?? {}) } ;
  console.log(detail?.data,product)
  const mutation = isEdit ? update : create;

  function handleSubmit(values, files) {
    const done = {
      onSuccess: () => {
        toast.success(isEdit ? "Product updated" : "Product created");
        navigate(ROUTES.admin.products);
      },
    };
    if (isEdit) update.mutate({ id, body: buildProductUpdate(values) }, done);
    else create.mutate(buildProductFormData(values, files), done);
  }

  let body;
  if (categories.isPending || (isEdit && (list.isPending || (listItem && detail.isPending)))) body = <Skeleton className="h-96 w-full" />;
  else if (categories.isError) body = <ErrorState message={categories.error.message} onRetry={categories.refetch} />;
  else if (isEdit && list.isError) body = <ErrorState message={list.error.message} onRetry={list.refetch} />;
  else if (isEdit && detail.isError) body = <ErrorState message={detail.error.message} onRetry={detail.refetch} />;
  else if (isEdit && !product) body = <EmptyState title="Product not found" description="It may be inactive or on another page of the list." />;
  else body = <ProductForm key={product?._id ?? "new"} product={product} categories={categories.data} onSubmit={handleSubmit} isPending={mutation.isPending} error={mutation.error} />;

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <Link to={ROUTES.admin.products} className="inline-flex w-fit items-center gap-2 text-sm text-primary hover:underline">
        <ArrowLeft aria-hidden="true" className="size-4" />
        All products
      </Link>
      <h1 className="text-3xl">{isEdit ? "Edit product" : "New product"}</h1>
      <Card tone="muted">{body}</Card>
    </div>
  );
}
