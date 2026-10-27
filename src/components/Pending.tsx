import { isPreview } from "@/content/site";

/**
 * Marks a missing business fact. Visible only in preview mode;
 * renders nothing once the site is launched, so gaps never reach customers.
 */
export function Pending({ label }: { label: string }) {
  if (!isPreview) return null;
  return (
    <em className="pending" title="Placeholder — add this in src/content/site.ts">
      {label} · to confirm
    </em>
  );
}
