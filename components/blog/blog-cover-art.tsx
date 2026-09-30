import Image from "next/image";

export function BlogCoverArt({
  slug,
  title,
  className = "",
}: {
  slug: string;
  title: string;
  className?: string;
}) {
  return (
    <Image
      src={`/images/blog/${slug}.webp`}
      alt={`Editorial cover image for ${title}`}
      width={1200}
      height={675}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className={`${className} object-cover`}
    />
  );
}
