import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router"
import {
   Database,
   LongArrowUpLeft,
   LongArrowUpRight,
   Plus,
} from "iconoir-react"
import { groupBy, sortBy } from "remeda"
import { CATEGORIES_EMOJIS } from "@/category/constants"
import { formatCurrency } from "@/currency"
import { CURRENCY_SYMBOLS } from "@/currency/constants"
import { formatDate } from "@/date"
import { currentMonth, monthOptions } from "@/date/filter"
import { transactionListInputSchema } from "@/transaction/filter"
import {
   transactionFirst,
   transactionImport,
   transactionList,
   transactionStats,
} from "@/transaction/functions"
import { Card } from "@/ui/components/card"
import { Empty } from "@/ui/components/empty"
import { FileTrigger } from "@/ui/components/file-trigger"
import { Select } from "@/ui/components/select"
import { Skeleton } from "@/ui/components/skeleton"
import { SuspenseBoundary } from "@/ui/components/suspense-boundary"

export const Route = createFileRoute("/_layout/")({
   component: RouteComponent,
   validateSearch: transactionListInputSchema.extend({
      month: transactionListInputSchema.shape.month
         .default(currentMonth())
         .catch(currentMonth()),
   }),
   loaderDeps: (opts) => ({ search: opts.search }),
   loader: async (opts) => {
      const [firstTransaction, transactions, stats] = await Promise.all([
         transactionFirst(),
         transactionList(opts.deps.search),
         transactionStats({ ...opts.deps.search, currency: "USD" }),
      ])

      return {
         firstTransaction,
         transactions,
         stats,
      }
   },
})

function RouteComponent() {
   const search = Route.useSearch()
   const navigate = useNavigate()
   const router = useRouter()
   const data = Route.useLoaderData()

   return (
      <div>
         <div className="fixed inset-x-0 bottom-6 mx-auto w-fit md:translate-x-28">
            <Select.Root
               value={search.month}
               onValueChange={(month) =>
                  navigate({ to: ".", search: { month } })
               }
            >
               <Select.Trigger className={"bg-background/50 backdrop-blur-2xl"}>
                  <Select.Value>
                     {(value) =>
                        formatDate(value, {
                           month: "long",
                           year: "numeric",
                        })
                     }
                  </Select.Value>
                  <Select.TriggerIcon />
               </Select.Trigger>
               <Select.Popup>
                  {monthOptions(data.firstTransaction.date).map((item) => (
                     <Select.Item
                        key={item.value}
                        value={item.value}
                     >
                        {item.label}
                     </Select.Item>
                  ))}
               </Select.Popup>
            </Select.Root>
         </div>
         {data.transactions.length === 0 ? (
            <Empty.Root>
               <Empty.Header>
                  <Empty.Media variant="icon">
                     <Database />
                  </Empty.Media>
                  <Empty.Title>No data found.</Empty.Title>
                  <Empty.Description>
                     Import a statement or switch filter below.
                  </Empty.Description>
               </Empty.Header>
               <Empty.Content>
                  <FileTrigger
                     onChange={async (e) => {
                        const formData = new FormData()
                        const file = e.target.files?.[0]
                        if (!file) return
                        formData.append("file", file)
                        transactionImport(file)
                           .then(() => router.invalidate())
                           .catch((error) => console.error(error))
                     }}
                  >
                     <Plus /> Import
                  </FileTrigger>
               </Empty.Content>
            </Empty.Root>
         ) : (
            <Card.Root>
               <div className="mb-5 grid grid-cols-2 gap-3 md:gap-4">
                  <div className="min-h-[78px] rounded-[1.25rem] bg-white px-4 pt-2.5 pb-3 shadow-xs/1">
                     <p className="mb-1 flex items-center justify-between text-muted">
                        Income
                        {/* <SuspenseBoundary
                        errorComponent={null}
                        fallback={null}
                     >
                        <AmountChange>
                           {(data) => data.incomeChange}
                        </AmountChange>
                     </SuspenseBoundary> */}
                     </p>
                     <SuspenseBoundary
                        errorComponent={null}
                        fallback={<Skeleton className="mt-3 h-4 w-24" />}
                     >
                        <Amount>
                           {formatCurrency(+data.stats.income.toFixed(0))}
                        </Amount>
                     </SuspenseBoundary>
                  </div>
                  <div className="min-h-[78px] rounded-[1.25rem] bg-white px-4 pt-2.5 pb-3 shadow-xs/1">
                     <p className="mb-1 flex items-center justify-between text-muted">
                        Expenses
                        {/* <SuspenseBoundary
                        errorComponent={null}
                        fallback={null}
                     >
                        <AmountChange>
                           {(data) => data.expenseChange}
                        </AmountChange>
                     </SuspenseBoundary> */}
                     </p>
                     <SuspenseBoundary
                        errorComponent={null}
                        fallback={<Skeleton className="mt-3 h-4 w-24" />}
                     >
                        <Amount>
                           {formatCurrency(
                              Math.abs(+data.stats.expense.toFixed(0)),
                           )}
                        </Amount>
                     </SuspenseBoundary>
                  </div>
               </div>
               <TransactionList />
            </Card.Root>
         )}
      </div>
   )
}

function Amount({ children }: { children: React.ReactNode }) {
   return (
      <p className="font-mono font-semibold">
         <span className="align-bottom text-muted text-sm leading-loose">
            $
         </span>{" "}
         <span className="text-lg">{children}</span>
      </p>
   )
}

// function _AmountChange({
//    children,
// }: {
//    children: (data: Awaited<ReturnType<typeof transactionStats>>) => number
// }) {
//    const search = Route.useSearch()
//    const data = useSuspenseQuery(transactionStatsQuery(search)).data
//    const value = children(data)

//    return (
//       <span
//          data-state={
//             value > 0 ? "positive" : value < 0 ? "negative" : undefined
//          }
//          className="font-medium text-xs data-[state=negative]:text-red-9 data-[state=positive]:text-green-9"
//       >
//          {value === 0 ? null : `${value}%`}
//       </span>
//    )
// }

const getGroupLabel = (dateStr: Date) => {
   const date = new Date(dateStr)
   const now = new Date()
   const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
   ).getTime()
   const yesterday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1,
   ).getTime()
   const target = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
   ).getTime()

   if (target === today) return "Today"
   if (target === yesterday) return "Yesterday"

   return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
   }).format(date)
}

function TransactionList() {
   const data = Route.useLoaderData()
   const grouped = groupBy(
      sortBy(data.transactions, [(x) => x.date, "desc"]),
      (item) => getGroupLabel(item.date),
   )

   return (
      <div className="space-y-5 md:space-y-7">
         {Object.entries(grouped).map(([label, items]) => (
            <div
               key={label}
               className="space-y-5"
            >
               <p className="pl-1 font-medium text-[0.75rem] text-muted uppercase tracking-wider">
                  {label}
               </p>
               <div className="space-y-4">
                  {items.map((item) => (
                     <div key={item.id}>
                        <div className="flex items-center gap-1">
                           {item.type === "Expense" ? (
                              <LongArrowUpLeft className="shrink-0 text-red-9" />
                           ) : (
                              <LongArrowUpRight className="shrink-0 text-green-9" />
                           )}
                           <span className="mr-5 line-clamp-1 font-medium">
                              {item.description}
                           </span>
                           <span
                              className="group ml-auto shrink-0 font-mono font-semibold data-green:text-green-9"
                              data-green={
                                 item.type === "Income" ? "" : undefined
                              }
                           >
                              <span className="align-top text-[0.75rem] text-muted leading-loose group-data-green:text-green-9">
                                 {CURRENCY_SYMBOLS[item.currency]}
                              </span>{" "}
                              <span>{Math.abs(item.amount) / 100}</span>
                           </span>
                        </div>
                        <div className="mt-1.5 flex items-center gap-1">
                           <span className="flex items-center gap-1.5 text-muted text-sm">
                              <span>{CATEGORIES_EMOJIS[item.category]}</span>
                              <span>{item.category}</span>
                           </span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         ))}
      </div>
   )
}
