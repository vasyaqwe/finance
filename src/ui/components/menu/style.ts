import { tv } from "tailwind-variants"

export const menuItem = tv({
   base: [
      "flex h-8 cursor-pointer select-none items-center gap-2 rounded-[calc(var(--popup-radius)-var(--popup-padding))] px-2.25 text-base focus-visible:outline-hidden data-[highlighted]:border-transparent data-[highlighted]:bg-surface-3 data-[highlighted]:outline-none data-[highlighted]:outline-hidden [&>svg]:size-[22px] [&>svg]:opacity-60 [&>svg]:transition-opacity [&>svg]:duration-[25ms] hover:[&>svg]:opacity-100 data-[highlighted]:[&>svg]:text-foreground md:[&>svg]:size-5",
   ],
   variants: {
      variant: {
         default: "",
         checkbox:
            "grid min-w-[calc(var(--anchor-width)+1.45rem)] grid-cols-[1.1rem_1fr] items-center gap-2 pr-4 pl-2",
         destructive:
            "data-[highlighted]:bg-red-100/70 data-[highlighted]:text-red-900",
      },
   },
   defaultVariants: {
      variant: "default",
   },
})
