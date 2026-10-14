import { COMMITMENTS } from "../../constants/homeContent";
import Card from "../../components/ui/Card";
import SectionHeading from "../../components/ui/SectionHeading";

export default function WhyChooseSection() {
  return (
    <section id="commitment" aria-labelledby="commitment-title" className="container-page scroll-mt-24 py-16">
      <SectionHeading
        id="commitment-title"
        align="center"
        eyebrow="Our commitment"
        title="Why Choose Lumira"
        description="Thoughtfully formulated rituals designed to honor your skin's biological balance."
      />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COMMITMENTS.map(({ icon: Icon, title, text }) => (
          <li key={title}>
            <Card tone="surface" className="flex h-full flex-col gap-4">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary-light text-primary-dark">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="text-lg">{title}</h3>
              <p className="text-sm leading-relaxed text-body">{text}</p>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
