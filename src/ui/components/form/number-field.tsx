import { NumberField as NumberFieldPrimitive } from "@base-ui-components/react/number-field"
import { Minus, Plus } from "iconoir-react"
import { Button } from "@/ui/components/button"
import { cn } from "@/ui/utils"

function Root({
   className,
   ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Root>) {
   return (
      <NumberFieldPrimitive.Root
         inputMode="numeric"
         className={cn("flex w-full items-center justify-between", className)}
         {...props}
      />
   )
}

function ScrubArea({
   ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.ScrubArea>) {
   return <NumberFieldPrimitive.ScrubArea {...props} />
}

function Label({ className, ...props }: React.ComponentProps<"label">) {
   return (
      <label
         className={cn("inline-block font-medium", className)}
         {...props}
      />
   )
}

function ScrubAreaCursor({
   ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.ScrubAreaCursor>) {
   return (
      <NumberFieldPrimitive.ScrubAreaCursor {...props}>
         <CursorGrowIcon />
      </NumberFieldPrimitive.ScrubAreaCursor>
   )
}

function Group({
   className,
   ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Group>) {
   return (
      <NumberFieldPrimitive.Group
         className={cn("flex items-center", className)}
         {...props}
      />
   )
}

function Decrement({
   ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Decrement>) {
   return (
      <NumberFieldPrimitive.Decrement
         render={
            <Button
               kind={"icon"}
               size={"sm"}
            >
               <Minus />
            </Button>
         }
         {...props}
      />
   )
}

function Increment({
   ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Increment>) {
   return (
      <NumberFieldPrimitive.Increment
         render={
            <Button
               kind={"icon"}
               size={"sm"}
            >
               <Plus />
            </Button>
         }
         {...props}
      />
   )
}

function Input({
   className,
   ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Input>) {
   return (
      <NumberFieldPrimitive.Input
         className={cn(
            "w-full max-w-11 text-center text-lg outline-hidden placeholder:text-foreground/40",
            className,
         )}
         {...props}
      />
   )
}

function CursorGrowIcon(props: React.ComponentProps<"svg">) {
   return (
      <svg
         width="26"
         height="14"
         viewBox="0 0 24 14"
         fill="black"
         stroke="white"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
      </svg>
   )
}

export const NumberField = {
   Root,
   Label,
   ScrubArea,
   ScrubAreaCursor,
   Group,
   Decrement,
   Increment,
   Input,
}
