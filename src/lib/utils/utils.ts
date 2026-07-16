import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Shared hover treatment for card-like surfaces (lift + brand border tint +
 * soft shadow). Compose with `cn()` alongside a component's own classes.
 */
export const interactiveCard =
  "transition-all duration-200 hover:border-brand/40 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 motion-reduce:hover:-translate-y-0"
