const getExchangeRatesFromApi = async (baseCurrency: string) => {
   const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`,
   )
   if (!response.ok) return null

   const data = (await response.json()) as { rates: { [key: string]: number } }
   return data.rates
}
export const getExchangeRates = async (baseCurrency: string) => {
   const apiRates = await getExchangeRatesFromApi(baseCurrency)
   if (!apiRates) return null

   return apiRates
}
