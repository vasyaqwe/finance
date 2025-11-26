import * as React from "react"
import { createPortal } from "react-dom"

type TooltipContextValue = {
   tooltip: { x: number; y: number } | undefined
   setTooltip: (tooltip: { x: number; y: number } | undefined) => void
}

const TooltipContext = React.createContext<TooltipContextValue | undefined>(
   undefined,
)

function useTooltipContext(): TooltipContextValue {
   const context = React.useContext(TooltipContext)
   if (!context) {
      throw new Error("Tooltip must be used within a Tooltip Context")
   }
   return context
}

function Root(props: { children: React.ReactNode }) {
   const [tooltip, setTooltip] = React.useState<{ x: number; y: number }>()

   return (
      <TooltipContext.Provider value={{ tooltip, setTooltip }}>
         {props.children}
      </TooltipContext.Provider>
   )
}

function Trigger({ ref, ...props }: React.ComponentProps<"g">) {
   const { children } = props
   const context = useTooltipContext()
   const triggerRef = React.useRef<SVGGElement | null>(null)

   React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
         if (
            triggerRef.current &&
            !triggerRef.current.contains(event.target as Node)
         ) {
            context.setTooltip(undefined)
         }
      }

      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("touchstart", handleClickOutside)

      return () => {
         document.removeEventListener("mousedown", handleClickOutside)
         document.removeEventListener("touchstart", handleClickOutside)
      }
   }, [context])

   return (
      <g
         ref={(node) => {
            // Maintain both refs
            triggerRef.current = node
            if (typeof ref === "function") {
               ref(node)
            } else if (ref) {
               ref.current = node
            }
         }}
         onPointerMove={(event) => {
            // Only handle mouse events, not touch
            if (event.pointerType === "mouse") {
               context.setTooltip({ x: event.clientX, y: event.clientY })
            }
         }}
         onPointerLeave={(event) => {
            // Only handle mouse events, not touch
            if (event.pointerType === "mouse") {
               context.setTooltip(undefined)
            }
         }}
         onTouchStart={(event) => {
            // On mobile, trigger when clicked instead of hover. Change as needed.
            context.setTooltip({
               x: event.touches[0]?.clientX ?? 0,
               y: event.touches[0]?.clientY ?? 0,
            })
            setTimeout(() => {
               context.setTooltip(undefined)
            }, 2000)
         }}
      >
         {children}
      </g>
   )
}

function Content(props: React.ComponentProps<"div">) {
   const { children } = props
   const context = useTooltipContext()
   const runningOnClient = typeof document !== "undefined"
   const tooltipRef = React.useRef<HTMLDivElement>(null)

   // Calculate position based on viewport
   const getTooltipPosition = () => {
      if (!context.tooltip) return {}

      // Use tooltip dimensions if available, otherwise use defaults
      const tooltipWidth = tooltipRef.current?.offsetWidth ?? 200 // fallback width
      const viewportWidth = window.innerWidth
      const willOverflowRight =
         context.tooltip.x + tooltipWidth + 10 > viewportWidth

      return {
         top: context.tooltip.y - 20,
         left: willOverflowRight
            ? context.tooltip.x - tooltipWidth - 10
            : context.tooltip.x + 10,
      }
   }

   if (!context.tooltip || !runningOnClient) {
      return null
   }

   const position = getTooltipPosition()

   return createPortal(
      <div
         ref={tooltipRef}
         className="pointer-events-none fixed z-50 rounded-xl border border-neutral bg-white px-3.5 py-2 shadow-xs"
         style={position}
      >
         {children}
      </div>,
      document.body,
   )
}

export const ChartTooltip = { Root, Trigger, Content }
