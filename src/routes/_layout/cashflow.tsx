import { createFileRoute } from "@tanstack/react-router"
import { line as d3_line, max, scaleLinear, scaleTime } from "d3"
import { type CSSProperties, useMemo } from "react"
import { formatCurrency } from "@/currency"
import { formatDate } from "@/date"
import { transactionCashflow } from "@/transaction/functions"
import { ChartTooltip } from "@/ui/components/chart/chart-tooltip"

export const Route = createFileRoute("/_layout/cashflow")({
   component: RouteComponent,
   loader: async () => {
      const [cashflow] = await Promise.all([transactionCashflow()])

      return cashflow
   },
})

function RouteComponent() {
   const data = Route.useLoaderData()
   const parsedData = useMemo(() => {
      return data
         .map((d) => {
            const [year, month, day] = d.date.split("-").map(Number)
            return {
               ...d,
               dateObj: new Date(year, month - 1, day),
            }
         })
         .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
   }, [data])

   const xScale = scaleTime()
      .domain([
         parsedData[0].dateObj,
         parsedData[parsedData.length - 1].dateObj,
      ])
      .range([0, 100])

   const maxVal = max(parsedData, (d) => Math.max(d.income, d.expense)) ?? 0

   const yScale = scaleLinear()
      .domain([0, maxVal * 1.1]) // 10% headroom
      .range([100, 0])

   const lineGenerator = d3_line<(typeof parsedData)[number]>().x((d) =>
      xScale(d.dateObj),
   )

   const incomeLine = lineGenerator.y((d) => yScale(d.income))(parsedData)
   const expenseLine = lineGenerator.y((d) => yScale(d.expense))(parsedData)

   if (!incomeLine || !expenseLine) return null

   return (
      <div
         className="relative h-72 w-full select-none"
         style={
            {
               "--marginTop": "0px",
               "--marginRight": "8px",
               "--marginBottom": "25px",
               "--marginLeft": "45px",
            } as CSSProperties
         }
      >
         <div className="absolute inset-0 h-[calc(100%-var(--marginTop)-var(--marginBottom))] w-(--marginLeft) translate-y-(--marginTop) overflow-visible">
            {yScale
               .ticks(5)
               .map(yScale.tickFormat(5, "d"))
               .map((value, i) => (
                  <div
                     key={i}
                     style={{ top: `${yScale(+value)}%`, left: "0%" }}
                     className="-translate-y-1/2 absolute w-full pr-3 text-right font-mono text-muted text-xs tabular-nums"
                  >
                     ${formatCurrency(+value)}
                  </div>
               ))}
         </div>
         <div className="absolute inset-0 h-[calc(100%-var(--marginTop)-var(--marginBottom))] w-[calc(100%-var(--marginLeft)-var(--marginRight))] translate-x-(--marginLeft) translate-y-(--marginTop) overflow-visible">
            <svg
               viewBox="0 0 100 100"
               className="h-full w-full overflow-visible"
               preserveAspectRatio="none"
            >
               {yScale.ticks(5).map((tick, i) => (
                  <g
                     key={i}
                     transform={`translate(0,${yScale(tick)})`}
                     className="text-neutral"
                  >
                     <line
                        x1={0}
                        x2={100}
                        stroke="currentColor"
                        strokeDasharray="4,4"
                        strokeWidth={0.5}
                        vectorEffect="non-scaling-stroke"
                     />
                  </g>
               ))}
               <path
                  d={incomeLine}
                  fill="none"
                  className="stroke-green-9"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
               />
               <path
                  d={expenseLine}
                  fill="none"
                  className="stroke-red-9"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
               />
               {parsedData.map((d, index) => {
                  const xPos = xScale(d.dateObj)
                  return (
                     <ChartTooltip.Root key={index}>
                        <ChartTooltip.Trigger>
                           <g className="group/tooltip">
                              <line
                                 x1={xPos}
                                 x2={xPos}
                                 y1={0}
                                 y2={100}
                                 stroke="currentColor"
                                 strokeWidth={1}
                                 className="text-surface-5 opacity-0 group-hover/tooltip:opacity-100"
                                 vectorEffect="non-scaling-stroke"
                                 style={{ pointerEvents: "none" }}
                              />
                              <rect
                                 x={(() => {
                                    const prevX =
                                       index > 0
                                          ? xScale(
                                               parsedData[index - 1].dateObj,
                                            )
                                          : xPos
                                    return (prevX + xPos) / 2
                                 })()}
                                 y={0}
                                 width={(() => {
                                    const prevX =
                                       index > 0
                                          ? xScale(
                                               parsedData[index - 1].dateObj,
                                            )
                                          : xPos
                                    const nextX =
                                       index < parsedData.length - 1
                                          ? xScale(
                                               parsedData[index + 1].dateObj,
                                            )
                                          : xPos
                                    const left = (prevX + xPos) / 2
                                    const right = (xPos + nextX) / 2
                                    return right - left
                                 })()}
                                 height={100}
                                 fill="transparent"
                              />
                           </g>
                        </ChartTooltip.Trigger>
                        <ChartTooltip.Content>
                           <div className="flex min-w-[170px] flex-col gap-1">
                              <div className="mb-1 font-medium text-muted text-xs">
                                 {formatDate(d.dateObj, {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                 })}
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                 <span className="flex items-center gap-1.5 text-green-9">
                                    <div className="h-1 w-3 rounded-sm bg-green-9" />
                                    Income
                                 </span>
                                 <span className="font-medium font-mono">
                                    ${formatCurrency(d.income)}
                                 </span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                 <span className="flex items-center gap-1.5 text-red-9">
                                    <div className="h-1 w-3 rounded-sm bg-red-9" />
                                    Expenses
                                 </span>
                                 <span className="font-medium font-mono">
                                    ${formatCurrency(d.expense)}
                                 </span>
                              </div>
                           </div>
                        </ChartTooltip.Content>
                     </ChartTooltip.Root>
                  )
               })}
               {/* {parsedData.length < 30 &&
                  parsedData.map((d, i) => (
                     <g key={i}>
                        <circle
                           cx={xScale(d.dateObj)}
                           cy={yScale(d.income)}
                           r={0.5}
                           vectorEffect="non-scaling-stroke"
                           className="fill-white stroke-2 stroke-green-9"
                        />
                        <circle
                           cx={xScale(d.dateObj)}
                           cy={yScale(d.expense)}
                           r={0.5}
                           vectorEffect="non-scaling-stroke"
                           className="fill-white stroke-2 stroke-red-9"
                        />
                     </g>
                  ))} */}
            </svg>
            <div className="translate-y-2">
               {xScale.ticks(5).map((date, i) => (
                  <div
                     key={i}
                     className="overflow-visible text-muted"
                  >
                     <div
                        style={{
                           left: `${xScale(date)}%`,
                           transform: "translateX(-50%)",
                        }}
                        className="absolute whitespace-nowrap text-xs"
                     >
                        {formatDate(date, { month: "short", day: "numeric" })}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}
