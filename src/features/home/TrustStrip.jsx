import { TRUST_ITEMS } from "../../constants/homeContent";

export default function TrustStrip() {
  return (
    <section aria-label="Why shop with us" className="container-page">
      <ul className="grid grid-cols-2 mt-3 gap-x-4 gap-y-8 pt-6 md:flex md:items-center md:justify-between">
        {TRUST_ITEMS.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2 text-sm text-body">
            <Icon aria-hidden="true" className="size-4 shrink-0 text-primary" />
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}
