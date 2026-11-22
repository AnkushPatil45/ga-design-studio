"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import { IMAGES, type ImageName } from "@/lib/images";

type Props = { name: ImageName; alt: string; sizes: string; className?: string; priority?: boolean };

/** Responsive WebP with a JPEG fallback and a blurred preview that fades out once the photo arrives. */
export default function Photo({ name, alt, sizes, className = "", priority = false }: Props) {
  const m = IMAGES[name];
  const [loaded, setLoaded] = useState(false);
  const srcSet = m.widths.map((w) => `${asset(`/img/${name}-${w}.webp`)} ${w}w`).join(", ");
  return (
    <picture className={`photo ${loaded ? "photo--loaded" : ""} ${className}`} style={{ backgroundImage: `url(${m.blur})` }}>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        src={asset(`/img/${name}-${m.fallback}.jpg`)}
        alt={alt}
        width={m.w}
        height={m.h}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        ref={(el) => { if (el?.complete && el.naturalWidth) setLoaded(true); }}
      />
    </picture>
  );
}
