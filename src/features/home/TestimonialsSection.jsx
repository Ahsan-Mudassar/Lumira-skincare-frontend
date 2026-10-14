import { TESTIMONIALS } from "../../constants/homeContent";
import Card from "../../components/ui/Card";
import RatingStars from "../../components/ui/RatingStars";
import SectionHeading from "../../components/ui/SectionHeading";

export default function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonials-title" className="container-page py-16">
      <SectionHeading
        id="testimonials-title"
        align="center"
        eyebrow="Testimonials"
        title="Loved by Skin Enthusiasts"
        description="Hear how our botanical rituals have shaped daily skincare routines."
      />
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map(({ name, initials, quote }) => (
          <li key={name}>
            <Card as="figure" tone="surface" className="flex h-full flex-col gap-4">
              <RatingStars value={5} variant="stars" />
              <blockquote className="flex-1 font-serif text-lg leading-relaxed text-ink italic">&ldquo;{quote}&rdquo;</blockquote>
              <figcaption className="flex items-center gap-3">
                <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-primary-light text-sm font-medium text-primary-dark">
                  {initials}
                </span>
                <span className="text-sm font-medium text-ink">{name}</span>
              </figcaption>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
