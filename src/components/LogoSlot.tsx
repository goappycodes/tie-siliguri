import Image from "next/image";

/**
 * Organisation logo slot.
 *
 * Renders the logo when `src` is set in the content JSON. Until artwork is
 * supplied it draws a neutral "LOGO" plate at the same dimensions, so the grid
 * keeps its rhythm and dropping a real file in later needs no layout change.
 */
export default function LogoSlot({
  src,
  name,
  className = "",
  height = 40,
}: {
  src?: string | null;
  name: string;
  className?: string;
  height?: number;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={height * 5}
        height={height}
        className={`w-auto object-contain ${className}`}
        style={{ maxHeight: height }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`flex items-center justify-center border border-dashed border-line-strong bg-paper-alt px-4 text-[9.5px] font-bold text-slate/60 ${className}`}
      style={{ height, minWidth: height * 2.4 }}
    >
      Logo
    </span>
  );
}
