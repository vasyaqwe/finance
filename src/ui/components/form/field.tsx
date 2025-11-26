import { Field as FieldPrimitive } from "@base-ui-components/react/field"
import { NumberField as NumberFieldPrimitive } from "@base-ui-components/react/number-field"
import type { VariantProps } from "tailwind-variants"
import { input } from "@/ui/components/input/style"
import { cn } from "@/ui/utils"

function Root({
   className,
   children,
   ...props
}: React.ComponentProps<typeof FieldPrimitive.Root>) {
   return (
      <FieldPrimitive.Root
         className={cn("relative w-full", className)}
         {...props}
      >
         {children}
         <FieldPrimitive.Error className={"sr-only"} />
      </FieldPrimitive.Root>
   )
}

function Label({
   className,
   ...props
}: React.ComponentProps<typeof FieldPrimitive.Label>) {
   return (
      <FieldPrimitive.Label
         className={cn("mb-1 inline-block font-medium", className)}
         {...props}
      />
   )
}

type FieldControlProps = Omit<
   React.ComponentProps<typeof FieldPrimitive.Control>,
   "size"
> &
   VariantProps<typeof input>

const ControlUnstyled = FieldPrimitive.Control

function Control({ className, variant, size, ...props }: FieldControlProps) {
   return (
      <FieldPrimitive.Control
         className={input({
            variant,
            size,
            className: typeof className === "string" ? className : undefined,
         })}
         {...props}
      />
   )
}

function NumberControl({
   children,
   placeholder,
   className,
   ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Root> & {
   placeholder?: string | undefined
}) {
   return (
      <NumberFieldPrimitive.Root
         inputMode="numeric"
         className={cn("w-full", className)}
         {...props}
      >
         <NumberFieldPrimitive.ScrubArea>
            <NumberFieldPrimitive.ScrubAreaCursor />
         </NumberFieldPrimitive.ScrubArea>
         <NumberFieldPrimitive.Group>
            <NumberFieldPrimitive.Decrement />
            <NumberFieldPrimitive.Input
               placeholder={placeholder}
               className={input()}
            />
            <NumberFieldPrimitive.Increment />
         </NumberFieldPrimitive.Group>
      </NumberFieldPrimitive.Root>
   )
}

function Description({
   className,
   ...props
}: React.ComponentProps<typeof FieldPrimitive.Description>) {
   return (
      <FieldPrimitive.Description
         className={cn("mt-1 text-muted text-sm", className)}
         {...props}
      />
   )
}

function Group({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         className={cn("space-y-4", className)}
         {...props}
      />
   )
}

export const Field = {
   Root,
   Label,
   Control,
   ControlUnstyled,
   NumberControl,
   Description,
   Group,
}

export type { FieldControlProps }
