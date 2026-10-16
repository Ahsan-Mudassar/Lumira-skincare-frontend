import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Alert from "../../../components/ui/Alert";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Modal from "../../../components/ui/Modal";
import { useCreateCategory, useUpdateCategory } from "./hooks";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(60, "Name is too long"),
  image: z.string().trim().refine((v) => v === "" || /^https:\/\//.test(v), "Image URL must start with https://"),
});

// category = undefined => create, object => edit. Slug backend khud banata hai (edit par badalta nahi).
export default function CategoryFormModal({ category, onClose }) {
  const isEdit = Boolean(category);
  const create = useCreateCategory();
  const update = useUpdateCategory();
  const mutation = isEdit ? update : create;
  const currentImage = typeof category?.image === "string" ? category.image : (category?.image?.url ?? "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { name: category?.name ?? "", image: currentImage } });

  function onSubmit(values) {
    const body = { name: values.name, ...(values.image && { image: values.image }) };
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
        {mutation.isError && <Alert variant="error">{mutation.error.message}</Alert>}
        <Input tone="surface" label="Name" error={errors.name?.message} {...register("name")} />
        <Input tone="surface" label="Image URL (optional)" placeholder="https://res.cloudinary.com/..." error={errors.image?.message} {...register("image")} />
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={mutation.isPending}>{isEdit ? "Save" : "Create"}</Button>
        </div>
      </form>
    </Modal>
  );
}
