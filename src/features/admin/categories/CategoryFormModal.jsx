import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import Alert from "../../../components/ui/Alert";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Modal from "../../../components/ui/Modal";
import { CATEGORY_IMAGE_TYPES, MAX_CATEGORY_IMAGE_MB } from "../../../constants/category.js"
import { buildCategoryFormData } from "./api.js";
import { useCreateCategory, useUpdateCategory } from "./hooks";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(60, "Name is too long")
});

export default function CategoryFormModal({ category, onClose }) {
  const isEdit = Boolean(category);
  const create = useCreateCategory();
  const update = useUpdateCategory();
  const mutation = isEdit ? update : create;

  const [file, setFile] = useState(null)
  const [fileError, setFileError] = useState("")

  const existingImage = typeof category?.image.url === "string" && category?.image?.url

  const newPreview = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file])
  useEffect(() => () => newPreview && URL.revokeObjectURL(newPreview), [newPreview])
  const preview = newPreview || existingImage;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { name: category?.name } });

  function handleFile(event) {
    const picked = event.target.files?.[0];
    event.target.value = "";
    if (!picked) return;

    if (!CATEGORY_IMAGE_TYPES.includes(picked.type)) {
      setFileError("Please choose a JPG, PNG, WebP image")
      return;
    }
    if (picked.size > MAX_CATEGORY_IMAGE_MB * 1024 * 1024) {
      setFileError(`Image must be ${MAX_CATEGORY_IMAGE_MB} MB or smaller`)
      return;
    }
    setFileError("")
    setFile(picked)
  }

  function onSubmit(values) {
    const body = buildCategoryFormData({ name: values.name, file });
    const options = {
      onSuccess: () => {
        toast.success(isEdit ? "Category updated" : "Category created");
        onClose();
      },
    };
    if (isEdit) update.mutate({ id: category._id, body }, options);
    else create.mutate(body, options);
  }

  return (
    <Modal open onClose={onClose} title={isEdit ? "Edit category" : "New category"} size="sm">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        {mutation.isError && <Alert variant="error">{mutation.error.status.message}</Alert>}
        <Input tone="surface" label="Name" placeholder="Enter category name" error={errors.name?.message} {...register("name")} />

        <div className="flex flex-col gap-3">
          <p className="text-base text-body">{isEdit?"Image (Not changing image will stay previous image)":"Image"}</p>
          <ul className="flex flex-wrap gap-3">

                <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-line bg-white w-full p-4 text-center text-sm text-muted transition-colors hover:border-primary focus-within:border-primary">
                  <ImagePlus aria-hidden="true" className="size-6 text-primary" />
                  <span>Choose 1 image</span>
                  <input type="file" accept={CATEGORY_IMAGE_TYPES.join(",")} multiple onChange={handleFile} className="sr-only" />
                </label>
                {
                  fileError && <p role="alert" className="text-sm text-danger">{fileError}</p>
                }
              
              {
                preview && <img src={preview} alt="category preview image" className="rounded-lg object-cover w-full h-60" />
              }
          </ul>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={mutation.isPending}>{isEdit ? "Save" : "Create"}</Button>
        </div>
      </form>
    </Modal>
  );
}
