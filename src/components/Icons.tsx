export function ArrowRight({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`fill-none stroke-current ${className}`}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8h11M9 3.5l4.5 4.5L9 12.5" />
    </svg>
  );
}

export function Play({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`fill-current ${className}`}>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.4-6.86a1 1 0 0 0 0-1.7L9.53 4.3A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

export function Close({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`fill-none stroke-current ${className}`}
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function Calendar({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`fill-none stroke-current ${className}`}
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <rect x="2" y="3.5" width="12" height="10.5" rx="1" />
      <path d="M2 6.5h12M5.5 1.8v2.4M10.5 1.8v2.4" />
    </svg>
  );
}

export function Pin({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`fill-none stroke-current ${className}`}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 14.5s5-4.4 5-8a5 5 0 0 0-10 0c0 3.6 5 8 5 8Z" />
      <circle cx="8" cy="6.4" r="1.9" />
    </svg>
  );
}

export function Clock({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`fill-none stroke-current ${className}`}
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <circle cx="8" cy="8" r="6.2" />
      <path d="M8 4.6V8l2.4 1.6" />
    </svg>
  );
}

/** Brand social glyphs, keyed by the `icon` string in site.json social[]. */
export function SocialIcon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const glyphs: Record<string, React.ReactNode> = {
    linkedin: (
      <path d="M4.98 3.5a2 2 0 1 1-.02 4 2 2 0 0 1 .02-4ZM3.3 8.98h3.36V21H3.3V8.98ZM9.02 8.98h3.22v1.64h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.17V21h-3.36v-5.33c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81V21H9.02V8.98Z" />
    ),
    instagram: (
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.5.01-4.74.07-.9.04-1.38.19-1.7.32-.43.16-.73.36-1.05.68-.32.32-.52.62-.68 1.05-.13.32-.28.8-.32 1.7-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.04.9.19 1.38.32 1.7.16.43.36.73.68 1.05.32.32.62.52 1.05.68.32.13.8.28 1.7.32 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.38-.19 1.7-.32.43-.16.73-.36 1.05-.68.32-.32.52-.62.68-1.05.13-.32.28-.8.32-1.7.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.38-.32-1.7a2.8 2.8 0 0 0-.68-1.05 2.8 2.8 0 0 0-1.05-.68c-.32-.13-.8-.28-1.7-.32-1.24-.06-1.6-.07-4.74-.07Zm0 2.76a5.46 5.46 0 1 1 0 10.92 5.46 5.46 0 0 1 0-10.92Zm0 1.62a3.84 3.84 0 1 0 0 7.68 3.84 3.84 0 0 0 0-7.68Zm5.64-2.9a1.28 1.28 0 1 1 0 2.56 1.28 1.28 0 0 1 0-2.56Z" />
    ),
    facebook: (
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.76 8.43-4.92 8.43-9.94Z" />
    ),
    x: (
      <path d="M17.53 3H20.5l-6.49 7.42L21.75 21h-5.98l-4.68-6.12L5.72 21H2.75l6.94-7.93L2.5 3h6.13l4.23 5.6L17.53 3Zm-1.05 16.2h1.65L7.6 4.7H5.83l10.65 14.5Z" />
    ),
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`fill-current ${className}`}>
      {glyphs[name] ?? glyphs.linkedin}
    </svg>
  );
}
