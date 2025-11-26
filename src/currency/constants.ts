import type { Currency } from "@/currency/types"

export const CURRENCIES = ["UAH", "USD", "EUR"] as const

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
   UAH: "₴",
   USD: "$",
   EUR: "€",
}
