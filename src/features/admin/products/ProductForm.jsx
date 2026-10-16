import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MAX_PRODUCT_IMAGES, SKIN_TYPES } from "../../../constants/product";
import Alert from "../../../components/ui/Alert";
import Button from "../../../components/ui/Button";
import Checkbox from "../../../components/ui/Checkbox";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Textarea from "../../../components/ui/Textarea";
import { getProductImages } from "../../products/productUtils";

const whole = (message) => z.string().trim().regex(/^\d+$/, message);
const optionalWhole = z.string().trim().refine((v) => v === "" || /^\d+$/.test(v), "Enter a whole number");

const productSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(120, "Name is too long"),
    description: z.string().trim().min(10, "Description must be at least 10 characters").max(5000, "Description is too long"),
    price: whole("Enter a whole number").refine((v) => Number(v) > 0, "Must be greater than 0"),
    discountPrice: optionalWhole,
    sku: z.string().trim().min(2, "SKU must be at least 2 characters").max(40, "SKU is too long"),
    category: z.string().min(1, "Select a category"),
    stock: optionalWhole,
    ingredients: z.string().trim(),
    skinType: z.array(z.string()),
    isFeatured: z.boolean(),
    isActive: z.boolean(),
  })
  .refine((d) => d.discountPrice === "" || Number(d.discountPrice) < Number(d.price), {
    message: "Discount price must be lower than the price",
    path: ["discountPrice"],
  });

const categoryId = (product) => (typeof product?.category === "object" ? (product.category?._id ?? "") : (product?.category ?? ""));

// Create: images upload (1-8). Edit: maujooda images dikhti hain (image badalna abhi supported nahi: backend contract unverified),
// stock alag "Update stock" se badalta hai (backend PATCH /products/:id mein stock reject karta hai).
export default function ProductForm({ product, categories = [], onSubmit, isPending, error }) {
  const isEdit = Boolean(product);
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price != null ? String(product.price) : "",
      discountPrice: product?.discountPrice != null ? String(product.discountPrice) : "",
      sku: product?.sku ?? "",
      category: categoryId(product),
      stock: "",
      ingredients: (product?.ingredients ?? []).join(", "),
      skinType: product?.skinType ?? [],
      isFeatured: Boolean(product?.isFeatured),
      isActive: product?.isActive !== false,
    },
  });

  const previews = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files]);
  useEffect(() => () => previews.forEach((url) => URL.revokeObjectURL(url)), [previews]);

  function handleFiles(event) {
    const picked = Array.from(event.target.files ?? []);
    if (picked.length > MAX_PRODUCT_IMAGES) {
      setFileError(`You can upload up to ${MAX_PRODUCT_IMAGES} images.`);
      return;
    }
    setFileError("");
    setFiles(picked);
  }

  function submit(values) {
    if (!isEdit && files.length === 0) {
      setFileError("Add at least one image.");
      return;
    }
    onSubmit(values, files);
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-6">
      {error && <Alert variant="error" title="Could not save product">{error.message}</Alert>}

      <div className="grid gap-4 md:grid-cols-2">
        <Input tone="surface" label="Name" className="md:col-span-2" error={errors.name?.message} {...register("name")} />
        <Textarea tone="surface" label="Description" rows={5} className="md:col-span-2" error={errors.description?.message} {...register("description")} />
        <Input tone="surface" label="Price (Rs)" type="number" inputMode="numeric" min="1" error={errors.price?.message} {...register("price")} />
        <Input tone="surface" label="Discount price (Rs, optional)" type="number" inputMode="numeric" min="1" hint="Must be lower than the price. Leave empty for no discount." error={errors.discountPrice?.message} {...register("discountPrice")} />
        <Input tone="surface" label="SKU" error={errors.sku?.message} {...register("sku")} />
        <Select tone="surface" label="Category" error={errors.category?.message} {...register("category")}>
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </Select>
        {!isEdit && (
          <Input tone="surface" label="Opening stock" type="number" inputMode="numeric" min="0" error={errors.stock?.message} {...register("stock")} />
        )}
        <Input tone="surface" label="Ingredients (comma separated)" className={isEdit ? "md:col-span-2" : ""} error={errors.ingredients?.message} {...register("ingredients")} />
      </div>

      <fieldset>
        <legend className="mb-3 text-base text-body">Suited for skin type</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {SKIN_TYPES.map((type) => (
            <Checkbox key={type} label={type.charAt(0).toUpperCase() + type.slice(1)} value={type} {...register("skinType")} />
          ))}
        </div>
      </fieldset>

      <div className="flex flex-wrap gap-x-8 gap-y-3">
        <Checkbox label="Featured on home page" {...register("isFeatured")} />
        {isEdit && <Checkbox label="Active (visible in store)" {...register("isActive")} />}
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-base text-body">Images</p>
        {isEdit ? (
          <>
            <ul className="flex flex-wrap gap-3">
              {getProductImages(product).map((url) => (
                <li key={url}><img src={url} alt="" className="size-20 rounded-lg object-cover" /></li>
              ))}
            </ul>
            <p className="text-sm text-muted">Changing images is not available yet.</p>
          </>
        ) : (
          <>
            <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-line bg-white p-6 text-center text-sm text-muted transition-colors hover:border-primary focus-within:border-primary">
              <ImagePlus aria-hidden="true" className="size-6 text-primary" />
              <span>Choose up to {MAX_PRODUCT_IMAGES} images (the first is the main image)</span>
              <input type="file" accept="image/*" multiple onChange={handleFiles} className="sr-only" />
            </label>
            {previews.length > 0 && (
              <ul className="flex flex-wrap gap-3">
                {previews.map((url, index) => (
                  <li key={url}><img src={url} alt={`Selected image ${index + 1}`} className="size-20 rounded-lg object-cover" /></li>
                ))}
              </ul>
            )}
            {fileError && <p role="alert" className="text-sm text-danger">{fileError}</p>}
          </>
        )}
      </div>

      <Button type="submit" size="lg" loading={isPending} className="self-start">
        {isEdit ? "Save changes" : "Create product"}
      </Button>
    </form>
  );
}
