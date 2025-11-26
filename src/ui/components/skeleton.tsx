import { cn } from "@/ui/utils"

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         className={cn(
            "animate-skeleton rounded-md [--skeleton-highlight:--alpha(white/64%)] [background:linear-gradient(120deg,transparent_40%,var(--skeleton-highlight),transparent_60%)_var(--skeleton-color,var(--color-surface-3))_0_0/200%_100%_fixed]",
            className,
         )}
         data-slot="skeleton"
         {...props}
      />
   )
}
