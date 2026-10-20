export const AI_MODE = process.env.NEXT_PUBLIC_AI_MODE || "free"

export function isFalMode() {
  return AI_MODE === "fal"
}
