import type { TRANSACTION_TYPES } from "@/transaction/constants"

export type TransactionType = (typeof TRANSACTION_TYPES)[number]
