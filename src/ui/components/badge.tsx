import { tv, type VariantProps } from "tailwind-variants"

const badge = tv({
   base: [
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full",
   ],
   variants: {
      variant: {
         default: "bg-surface-12 text-surface-1",
      },
      size: {
         sm: "h-7 px-2 text-sm",
         md: "h-8 px-3",
      },
   },
   defaultVariants: {
      variant: "default",
      size: "md",
   },
})

interface Props
   extends React.ComponentProps<"span">,
      VariantProps<typeof badge> {}

export function Badge({ className, variant, size, ...props }: Props) {
   return (
      <span
         className={badge({ variant, size, className })}
         {...props}
      />
   )
}
