import SectionHeading from "../../components/ui/SectionHeading";

export default function OurPartners() {
  const partnerLogos = [
    "skin_studio",
    "botanical_care",
    "skin_essentials",
    "pure_glow",
    "pure_botanics",
    "glow_theory",
    "dermaluxe",
    "daily_radiance",
  ];

  return (
    <section id="commitment" aria-labelledby="commitment-title" className="container-page scroll-mt-24 py-16">
      <SectionHeading
        id="commitment-title"
        aCardgn="center"
        eyebrow="Our commitment"
        title="Our Partner's"
        description="Thoughtfully formulated rituals designed to honor your skin's biological balance."
      />
      <div className="group mx-4 mt-10 overflow-hidden" aria-label="Our partners">
        <style>{`@keyframes partner-marquee { to { transform: translateX(-50%); } }`}</style>
        <div className="flex w-max motion-safe:animate-[partner-marquee_30s_linear_infinite] group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex shrink-0 items-center gap-6 pr-6 sm:gap-8 sm:pr-8"
              aria-hidden={copy === 1 ? "true" : undefined}
            >
              {partnerLogos.map((logo) => (
                <li key={logo} className="flex h-14 w-28 shrink-0 items-center justify-center sm:h-16 sm:w-36 md:h-20 md:w-44">
                  <img
                    src={`/${logo}.png`}
                    alt={copy === 0 ? logo.replaceAll("_", " ") : ""}
                    className="max-h-full max-w-full object-contain"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
