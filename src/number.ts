export const formatNumber = (
   number: number,
   options: Intl.NumberFormatOptions = {},
) => {
   return new Intl.NumberFormat("en-US", {
      notation: options.notation ?? "standard",
      ...options,
   }).format(Number(number))
}
