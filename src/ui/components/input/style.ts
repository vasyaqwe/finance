import { tv } from "tailwind-variants"

export const input = tv({
   base: ["w-full rounded-xl outline-hidden transition"],
   variants: {
      variant: {
         default:
            "border-2 border-transparent bg-surface-3/75 placeholder:text-foreground/40 hover:bg-surface-3 focus:border-primary-10 data-[invalid]:bg-red-4/30 data-[invalid]:focus:border-red-9 data-[invalid]:hover:bg-red-4/40 data-[invalid]:placeholder:text-red-11/75",
         unset: "h-auto bg-transparent placeholder:text-foreground/40",
      },
      size: {
         md: "h-[34px] px-3 text-base [[type=time]]:px-2.5",
         lg: "h-[38px] px-3.5 text-[1rem] [[type=time]]:px-3",
      },
   },
   defaultVariants: {
      variant: "default",
      size: "md",
   },
})
