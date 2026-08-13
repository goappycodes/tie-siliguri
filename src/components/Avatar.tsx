import Image from "next/image";

/**
 * Circular headshot slot.
 *
 * Renders the person's photo when `src` is set in the content JSON. Until real
 * headshots are supplied, it draws a neutral placeholder — a silhouette on a
 * tinted circle with a brand ring — so the layout already reserves the exact
 * space a photo will occupy and nothing shifts when photos land.
 */
export default function Avatar({
  src,
  name,
  size = 56,
  tone = "light",
}: {
  src?: string | null;
  name: string;
  size?: number;
  tone?: "light" | "dark";
}) {
  const ring = tone === "dark" ? "ring-white/20" : "ring-tie-red/25";
  const bg = tone === "dark" ? "bg-white/8" : "bg-tie-red-light";
  const fg = tone === "dark" ? "text-white/45" : "text-tie-red/55";

  return (
    <span
      className={`relative flex flex-none items-center justify-center overflow-hidden rounded-full ring-2 ${ring} ${src ? "" : bg}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          width={size * 2}
          height={size * 2}
          className="h-full w-full object-cover"
        />
      ) : (
        /* Placeholder silhouette — decorative, the name sits beside it. */
        <svg
          viewBox="0 0 40 40"
          aria-hidden="true"
          className={`h-[62%] w-[62%] fill-current ${fg}`}
        >
          <circle cx="20" cy="13.5" r="7.5" />
          <path d="M20 23c-7.2 0-13 4.6-13 10.3V36h26v-2.7C33 27.6 27.2 23 20 23Z" />
        </svg>
      )}
    </span>
  );
}
