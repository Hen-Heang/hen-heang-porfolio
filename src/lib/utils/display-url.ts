/** Strips the protocol and trailing slash so URLs read like plain text on a printed resume. */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "")
}
