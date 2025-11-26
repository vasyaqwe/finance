export const monthOptions = (firstTransactionDate: Date) => {
   const options = []
   const now = new Date()
   const start = new Date(firstTransactionDate)
   start.setDate(1)

   for (let d = new Date(now); d >= start; d.setMonth(d.getMonth() - 1)) {
      options.push({
         value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
         label: d.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
         }),
      })
   }

   return options
}

export const currentMonth = () => {
   const now = new Date()
   return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
}
