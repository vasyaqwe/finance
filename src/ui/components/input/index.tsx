import type { VariantProps } from "tailwind-variants"
import { input } from "@/ui/components/input/style"

interface Props
   extends Omit<React.ComponentProps<"input">, "size">,
      VariantProps<typeof input> {}

export function Input({ className, variant, size, ...props }: Props) {
   return (
      <input
         className={input({ variant, size, className })}
         {...props}
      />
   )
}
