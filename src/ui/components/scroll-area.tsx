import { ScrollArea as ScrollAreaPrimitive } from "@base-ui-components/react/scroll-area"
import { cn } from "@/ui/utils"

function Root({
   className,
   children,
   ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Viewport>) {
   return (
      <ScrollAreaPrimitive.Root className={"grow"}>
         <ScrollAreaPrimitive.Viewport
            className={"absolute inset-0 overscroll-contain [&>div]:min-w-0!"}
            {...props}
         >
            <ScrollAreaPrimitive.Content
               className={cn("flex grow flex-col", className)}
            >
               {children}
            </ScrollAreaPrimitive.Content>
         </ScrollAreaPrimitive.Viewport>
         <Scrollbar />
      </ScrollAreaPrimitive.Root>
   )
}

function Scrollbar({
   className,
   ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
   return (
      <ScrollAreaPrimitive.Scrollbar
         className={cn(
            "flex w-1.5 justify-center bg-surface-4 opacity-0 transition-opacity delay-300 duration-0 data-hovering:opacity-100 data-scrolling:opacity-100 data-hovering:delay-100 data-scrolling:delay-100",
            className,
         )}
         {...props}
      >
         <ScrollAreaPrimitive.Thumb
            className={"w-full rounded-[inherit] bg-surface-7"}
         />
      </ScrollAreaPrimitive.Scrollbar>
   )
}

export const ScrollArea = {
   Root,
   Scrollbar,
}
