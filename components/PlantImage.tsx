"use client";

export default function PlantImage({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  const fallback = "/images/placeholder-plant.jpg";
  return (
    <img
      src={src || fallback}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = fallback;
      }}
      alt={alt}
      className={className}
    />
  );
}
