import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "@/ui/utils"

function Root({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         className={cn(
            "flex min-w-0 flex-1 flex-col items-center gap-6 text-balance rounded-xl border-dashed px-6 text-center max-md:justify-center md:px-12",
            className,
         )}
         data-slot="empty"
         {...props}
      />
   )
}

function Header({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         className={cn(
            "flex max-w-sm flex-col items-center text-center",
            className,
         )}
         data-slot="empty-header"
         {...props}
      />
   )
}

const emptyMedia = tv({
   base: "flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
   defaultVariants: {
      variant: "default",
   },
   variants: {
      variant: {
         default: "bg-transparent",
         icon: "relative flex size-9 shrink-0 items-center justify-center rounded-md border border-neutral bg-background text-foreground shadow-black/5 shadow-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-md)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] [&_svg:not([class*='size-'])]:size-4.5",
      },
   },
})

function Media({
   className,
   variant = "default",
   ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMedia>) {
   return (
      <div
         className={cn("relative mb-6", className)}
         data-slot="empty-media"
         data-variant={variant}
         {...props}
      >
         {variant === "icon" && (
            <>
               <div
                  aria-hidden="true"
                  className={cn(
                     emptyMedia({ className, variant }),
                     "-translate-x-0.5 -rotate-10 pointer-events-none absolute bottom-px origin-bottom-left scale-84 shadow-none",
                  )}
               />
               <div
                  aria-hidden="true"
                  className={cn(
                     emptyMedia({ className, variant }),
                     "pointer-events-none absolute bottom-px origin-bottom-right translate-x-0.5 rotate-10 scale-84 shadow-none",
                  )}
               />
            </>
         )}
         <div
            className={cn(emptyMedia({ className, variant }))}
            {...props}
         />
      </div>
   )
}

function Title({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         className={cn("text-xl leading-none", className)}
         data-slot="empty-title"
         {...props}
      />
   )
}

function Description({ className, ...props }: React.ComponentProps<"p">) {
   return (
      <div
         className={cn(
            "text-muted text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4 [[data-slot=empty-title]+&]:mt-1",
            className,
         )}
         data-slot="empty-description"
         {...props}
      />
   )
}

function Content({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         className={cn(
            "flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm",
            className,
         )}
         data-slot="empty-content"
         {...props}
      />
   )
}

export const Empty = { Root, Header, Title, Description, Content, Media }
