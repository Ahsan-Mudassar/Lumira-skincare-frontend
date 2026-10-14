import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Leaf, Pause, Play, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { HERO_SLIDES } from "./heroSlides";
import { SITE } from "../../constants/site";
import { cn } from "../../lib/cn";
import Button from "../../components/ui/Button";

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 50;

function optimize(url, width) {
  return url.includes("/upload/") ? url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`) : url;
}

const buildSrcSet = (url) => [800, 1280, 1920].map((width) => `${optimize(url, width)} ${width}w`).join(", ");

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const reveal = (active, delay) =>
  cn(
    "transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none",
    active ? `translate-y-0 opacity-100 ${delay}` : "translate-y-4 opacity-0"
  );

function ControlButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white [&_svg]:size-4"
    >
      {children}
    </button>
  );
}

export default function HeroSection({ slides = HERO_SLIDES, autoPlay = true, interval = AUTOPLAY_MS }) {
  const total = slides.length;
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(() => autoPlay && !prefersReducedMotion());
  const [isHovering, setIsHovering] = useState(false);
  const touchStartX = useRef(null);

  const [visited, setVisited] = useState(() =>
    total ? new Set([0, 1 % total, total - 1]) : new Set()
  );
  const activeIndex = total ? current % total : 0;

  const goTo = useCallback(
    (index) => {
      if (!total) return;
      const target = (index + total) % total;
      setCurrent(target);
      setVisited((previous) => {
        const nextSet = new Set(previous);
        [target, (target + 1) % total, (target - 1 + total) % total].forEach((i) => nextSet.add(i));
        return nextSet.size === previous.size ? previous : nextSet;
      });
    },
    [total]
  );

  useEffect(() => {
    if (!isPlaying || isHovering || total < 2) return;
    const timer = setTimeout(() => goTo(activeIndex + 1), interval);
    return () => clearTimeout(timer);
  }, [activeIndex, isPlaying, isHovering, total, interval, goTo]);

  function handleKeyDown(event) {
    if (event.key === "ArrowRight") goTo(activeIndex + 1);
    if (event.key === "ArrowLeft") goTo(activeIndex - 1);
  }

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) > SWIPE_THRESHOLD) goTo(activeIndex + (distance < 0 ? 1 : -1));
  }

  function handleBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsHovering(false);
  }

  const autoMoving = isPlaying && !isHovering;

  if (!total) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="container-page pt-4 md:pt-2"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsHovering(true)}
      onBlur={handleBlur}
    >
      <h1 className="sr-only">{SITE.fullName}</h1>

      <div
        className="relative isolate touch-pan-y overflow-hidden rounded-xl bg-primary-dark shadow-soft"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div aria-hidden="true" className="absolute inset-0 -z-20">
          {slides.map(
            (slide, index) =>
              visited.has(index) && (
                <img
                  key={slide.image}
                  src={optimize(slide.image, 1280)}
                  srcSet={buildSrcSet(slide.image)}
                  sizes="(min-width: 1280px) 1216px, 100vw"
                  alt=""
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  draggable={false}
                  className={cn(
                    "absolute inset-0 size-full object-cover transition-[opacity,scale] duration-1000 ease-out motion-reduce:transition-none",
                    index === activeIndex ? "scale-100 opacity-100" : "scale-105 opacity-0"
                  )}
                />
              )
          )}
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-t from-primary-dark/90 via-primary-dark/45 to-primary-dark/5 md:bg-linear-to-r md:from-primary-dark/75 md:via-primary-dark/30 md:to-transparent"
        />

        <div className="grid h-[calc(100dvh-4rem)] min-h-0 grid-rows-[minmax(0,1fr)]">
          {slides.map((slide, index) => {
            const active = index === activeIndex;
            return (
              <div
                key={slide.image}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${total}`}
                aria-hidden={!active}
                inert={!active}
                className="relative col-start-1 row-start-1 flex items-end md:items-center"
              >
                <div className="flex max-w-2xl flex-col items-start gap-3 p-5 pb-24 sm:gap-5 sm:p-6 sm:pb-24 md:p-14">
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full bg-[#90ee9047] px-4 py-1.5 text-sm text-white backdrop-blur",
                      reveal(active, "delay-100")
                    )}
                  >
                    <Leaf aria-hidden="true" className="size-4" />
                    {slide.badge}
                  </span>
                  <h2 className={cn("text-3xl leading-tight text-white sm:text-4xl md:text-6xl", reveal(active, "delay-200"))}>
                    {slide.title}
                  </h2>
                  <p className={cn("max-w-lg text-sm text-white/85 sm:text-base md:text-lg", reveal(active, "delay-300"))}>
                    {slide.description}
                  </p>
                  <div className={cn("flex flex-wrap gap-3 pt-2 mb-6", reveal(active, "delay-500"))}>
                    <Button as={Link} to={slide.to} size="md" className="md:px-8 md:py-4">
                      {slide.cta}
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Button>
                    <Button as="a" href="#commitment" className="bg-white/10  backdrop-blur-md transition-all duration-300 hover:bg-white/20 md:px-8 md:py-4" size="md">
                      Our Philosophy
                    </Button>
                  </div>
                </div>

                {slide.spotlight && (
                  <Link
                    to={slide.spotlight.to}
                    className={cn(
                      "absolute bottom-6 left-14 hidden w-64 items-center gap-3 rounded-xl bg-white/85 p-3 shadow-soft backdrop-blur md:flex",
                      reveal(active, "delay-700")
                    )}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-muted">Featured</span>
                      <span className="block truncate text-sm font-medium text-ink">{slide.spotlight.name}</span>
                    </span>
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-white">
                      <Plus aria-hidden="true" className="size-4" />
                    </span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {total > 1 && (
          <div className="absolute right-4 bottom-4 z-10 flex items-center gap-1 rounded-full bg-white/20 py-1 pr-1.5 pl-3 backdrop-blur-md md:right-6 md:bottom-6">
            <div role="group" aria-label="Choose slide" className="flex items-center">
              {slides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => goTo(index)}
                  className="group rounded-full p-1.5 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-[width,background-color] duration-500 motion-reduce:transition-none",
                      index === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/50 group-hover:bg-white/80"
                    )}
                  />
                </button>
              ))}
            </div>
            <span aria-hidden="true" className="mx-1 h-4 w-px bg-white/40" />
            <ControlButton
              label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              onClick={() => setIsPlaying((value) => !value)}
            >
              {isPlaying ? <Pause /> : <Play />}
            </ControlButton>
            <ControlButton label="Previous slide" onClick={() => goTo(activeIndex - 1)}>
              <ChevronLeft />
            </ControlButton>
            <ControlButton label="Next slide" onClick={() => goTo(activeIndex + 1)}>
              <ChevronRight />
            </ControlButton>
          </div>
        )}

        <p aria-live={autoMoving ? "off" : "polite"} className="sr-only">
          Slide {activeIndex + 1} of {total}: {slides[activeIndex].title}
        </p>
      </div>
    </section>
  );
}