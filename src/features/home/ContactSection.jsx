import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CONTACT, SITE } from "../../constants/site";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import SectionHeading from "../../components/ui/SectionHeading";
import Textarea from "../../components/ui/Textarea";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(1000, "Message is too long"),
});

function buildInfoItems() {
  const items = [];
  if (CONTACT.email) items.push({ icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` });
  if (CONTACT.phone) items.push({ icon: Phone, label: "Phone", value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, "")}` });
  if (CONTACT.whatsapp)
    items.push({ icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${CONTACT.whatsapp}` });
  if (CONTACT.address) items.push({ icon: MapPin, label: "Visit", value: CONTACT.address });
  if (CONTACT.hours) items.push({ icon: Clock, label: "Hours", value: CONTACT.hours });
  return items;
}

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(contactSchema), defaultValues: { name: "", email: "", message: "" } });

  const items = buildInfoItems();

  function onSubmit(values) {
    if (!CONTACT.email) return;
    const subject = encodeURIComponent(`Message from ${values.name} (${SITE.name} website)`);
    const body = encodeURIComponent(`${values.message}\n\n${values.name}\n${values.email}`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="container-page scroll-mt-24 py-16">
      <SectionHeading
        id="contact-title"
        align="center"
        eyebrow="Get in touch"
        title="We'd Love to Hear From You"
        description="Questions about a product, an order or your skin routine? Send us a message."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <ul className="flex flex-col gap-3">
          {items.map(({ icon: Icon, label, value, href }) => (
            <li key={label}>
              <Card tone="surface" padding="sm" className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary-dark">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-muted">{label}</p>
                  {href ? (
                    <a href={href} className="block truncate font-medium text-ink hover:text-primary">
                      {value}
                    </a>
                  ) : (
                    <p className="font-medium text-ink">{value}</p>
                  )}
                </div>
              </Card>
            </li>
          ))}
        </ul>

        {CONTACT.email && (
          <Card>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input tone="surface" label="Your name" autoComplete="name" error={errors.name?.message} {...register("name")} />
                <Input tone="surface" label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
              </div>
              <Textarea tone="surface" label="Message" rows={5} error={errors.message?.message} {...register("message")} />
              <Button type="submit" size="lg" className="self-start">
                <Send aria-hidden="true" className="size-4" />
                Send message
              </Button>
              <p className="text-xs text-muted">This opens your email app with the message ready to send.</p>
            </form>
          </Card>
        )}
      </div>
    </section>
  );
}
