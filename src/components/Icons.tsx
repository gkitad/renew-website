/** Minimal stroke icons, decorative unless labelled by the parent. */
type P = { size?: number };

export function Arrow({ size = 16 }: P) {
  return (
    <svg className="arrow" width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function Close({ size = 20 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Plus({ size = 16 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function Chevron({ size = 20, dir = "right" }: P & { dir?: "left" | "right" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" style={dir === "left" ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M7 3l7 7-7 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
