import { Button as ButtonPrimitive } from "@base-ui-components/react/button"
import type { useRender } from "@base-ui-components/react/use-render"
import type { VariantProps } from "tailwind-variants"
import { tv } from "tailwind-variants"
import { focus } from "@/ui/focus"

const button = tv({
   base: [
      "touch-hitbox inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full",
      "relative disabled:cursor-not-allowed disabled:opacity-75 disabled:grayscale",
      focus(),
   ],
   variants: {
      variant: {
         primary: "bg-surface-12 text-surface-1 hover:bg-surface-12/90",
         secondary: "border border-neutral hover:bg-surface-2",
         ghost: "hover:bg-surface-2 aria-[current=page]:bg-surface-2 data-[popup-open]:bg-surface-2",
         destructive: "bg-red-9 text-white hover:bg-red-9/90",
      },
      size: {
         sm: "h-8 gap-1.5 px-2.5 text-sm [&_svg:not([data-slot=loading])]:size-4.5",
         md: "h-[34px] gap-1.5 px-3.5 text-base has-[svg:not([data-slot=loading])]:pl-2.5 [&_svg:not([data-slot=loading])]:size-5",
         lg: "h-[38px] gap-2.5 px-4 text-[1rem] [&_svg:not([data-slot=loading])]:size-5.5",
      },
      kind: {
         default: "",
         icon: "!px-0 aspect-square w-auto justify-center",
      },
   },
   defaultVariants: {
      variant: "primary",
      size: "md",
      kind: "default",
   },
})

interface Props
   extends useRender.ComponentProps<"button">,
      VariantProps<typeof button> {
   pending?: boolean | undefined
}

export function Button({
   variant,
   size,
   kind,
   pending,
   disabled,
   className,
   ...props
}: Props) {
   return (
      <ButtonPrimitive
         data-pending={pending ? "" : undefined}
         disabled={disabled ?? !!pending}
         className={button({ variant, size, kind, className })}
         {...props}
      />
   )
}
