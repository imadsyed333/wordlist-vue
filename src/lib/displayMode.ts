export function isStandalonePwa(
  matches = (query: string) => matchMedia(query).matches,
  standalone = (navigator as { standalone?: boolean }).standalone,
) {
  return matches("(display-mode: standalone)") || standalone === true;
}
