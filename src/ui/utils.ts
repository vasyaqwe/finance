import { cnMerge } from "tailwind-variants"

// biome-ignore lint/suspicious/noExplicitAny: <>
export function cn(...inputs: any[]) {
   return cnMerge(...inputs)({ twMerge: true })
}

export const formatList = (items: string[], locale = "en") => {
   const formatter = new Intl.ListFormat(locale, {
      style: "long",
      type: "conjunction",
   })
   return formatter.format(items)
}
