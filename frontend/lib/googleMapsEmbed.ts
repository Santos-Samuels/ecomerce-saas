function isGoogleMapsEmbedUrlInternal(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const u = new URL(trimmed);
    if (u.protocol !== "https:") return false;
    const host = u.hostname.toLowerCase();
    const hostOk =
      host === "www.google.com" ||
      host === "google.com" ||
      host === "maps.google.com" ||
      host.endsWith(".google.com") ||
      host.endsWith(".google.com.br");
    return hostOk && u.pathname.includes("/maps/embed");
  } catch {
    return false;
  }
}

/** True if the string is a safe https Google Maps embed URL (iframe src). */
export function isGoogleMapsEmbedUrl(url: string): boolean {
  return isGoogleMapsEmbedUrlInternal(url);
}

/**
 * Accepts a raw embed URL or pasted iframe HTML; returns the embed URL or null.
 */
export function extractGoogleMapsEmbedUrl(raw: string | null | undefined): string | null {
  if (raw == null) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const iframeMatch = trimmed.match(/src\s*=\s*["']([^"']+)["']/i);
  const candidate = iframeMatch ? iframeMatch[1].trim() : trimmed;

  return isGoogleMapsEmbedUrlInternal(candidate) ? candidate : null;
}
