export const generateHash = async (message: string) => {
   const encoder = new TextEncoder()
   const data = encoder.encode(message)
   const hashBuffer = await crypto.subtle.digest("SHA-256", data)
   const hashArray = Array.from(new Uint8Array(hashBuffer))
   return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export const dateRangeFromMonth = (month: string) => {
   const [year, monthNum] = month.split("-").map(Number)
   if (!year || !monthNum) throw new Error("Invalid month")
   const currentStart = new Date(year, monthNum - 1, 1)
   const currentEnd = new Date(year, monthNum, 0, 23, 59, 59, 999)
   return { currentStart, currentEnd }
}
