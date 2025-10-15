"use client";

export default function PlantImage({
  id,
  alt,
  className,
}: {
  id: number;
  alt: string;
  className?: string;
}) {
  const src = `/api/plant-image?id=${id}`;
  return (
    <img
      src={src}
      alt={alt}
      className={className ?? "max-h-full max-w-full object-contain"}
      loading="lazy"
    />
  );
}
