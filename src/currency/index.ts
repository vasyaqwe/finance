export const formatCurrency = (
   price: number,
   options: Intl.NumberFormatOptions = {},
) => {
   const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: options.currency ?? "USD",
      notation: options.notation ?? "standard",
      currencyDisplay: "code",
      ...options,
   })
      .format(Number(price))
      .replace(".00", "")

   const currencyCode = options.currency ?? "UAH"

   return formattedPrice.replace(currencyCode, "").replace("USD", "").trim()
}
