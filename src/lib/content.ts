import { services, type Service } from "@/content/services";
import { isPreview } from "@/content/site";

/** Services visible on the public site: all in preview, only confirmed ones at launch. */
export function visibleServices(): Service[] {
  return isPreview ? services : services.filter((s) => s.confirmed);
}

export function getService(slug: string): Service | undefined {
  return visibleServices().find((s) => s.slug === slug);
}

export function pad(n: number): string {
  return String(n).padStart(2, "0");
}
