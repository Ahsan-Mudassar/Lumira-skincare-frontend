import { useState } from "react";
import { cloudinaryUrl } from "../../lib/cloudinary";
import { cn } from "../../lib/cn";

export default function ProductGallery({ images, name }) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return <div aria-hidden="true" className="aspect-square rounded-xl bg-surface" />;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square overflow-hidden rounded-xl bg-surface">
        <img
          key={images[index]}
          src={cloudinaryUrl(images[index], 1000)}
          alt={`${name}, image ${index + 1} of ${images.length}`}
          fetchPriority="high"
          className="size-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <ul className="grid grid-cols-5 gap-2 sm:grid-cols-6">
          {images.map((image, i) => (
            <li key={image}>
              <button
                type="button"
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => setIndex(i)}
                className={cn(
                  "block aspect-square w-full overflow-hidden rounded-lg border-2 bg-surface transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  i === index ? "border-primary" : "border-transparent hover:border-line"
                )}
              >
                <img src={cloudinaryUrl(image, 200)} alt="" loading="lazy" className="size-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
