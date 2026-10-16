import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Modal from "../../../components/ui/Modal";
import SegmentedControl from "../../../components/ui/SegmentedControl";
import { useUpdateStock } from "./hooks";

export default function StockModal({ product, onClose }) {
  const [mode, setMode] = useState("set");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const update = useUpdateStock();

  function submit(event) {
    event.preventDefault();
    const number = Number(value);
    const valid = mode === "set" ? Number.isInteger(number) && number >= 0 : Number.isInteger(number) && number !== 0;
    if (value === "" || !valid) {
      setError(mode === "set" ? "Enter a whole number, 0 or more." : "Enter a whole number, like 10 or -5.");
      return;
    }
    update.mutate(
      { id: product._id, body: mode === "set" ? { stock: number } : { adjustBy: number } },
      {
        onSuccess: () => {
          toast.success("Stock updated");
          onClose();
        },
        onError: (err) => setError(err.message),
      }
    );
  }

  return (
    <Modal open onClose={onClose} title="Update stock" description={product.name} size="sm">
      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        {product.stock != null && <p className="text-sm text-muted">Current stock: {product.stock}</p>}
        <SegmentedControl
          label="Stock mode"
          value={mode}
          onChange={(next) => {
            setMode(next);
            setError("");
          }}
          options={[
            { value: "set", label: "Set to" },
            { value: "adjust", label: "Adjust by" },
          ]}
        />
        <Input tone="surface" label={mode === "set" ? "New stock quantity" : "Change (+ or -)"} type="number" inputMode="numeric" value={value} onChange={(e) => setValue(e.target.value)} error={error} />
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={update.isPending}>Save</Button>
        </div>
      </form>
    </Modal>
  );
}
