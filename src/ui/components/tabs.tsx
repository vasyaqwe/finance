import { Tabs as TabsPrimitive } from "@base-ui-components/react/tabs"
import { focus } from "@/ui/focus"
import { cn } from "@/ui/utils"

const Root = TabsPrimitive.Root

function List({
   className,
   children,
   ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
   return (
      <TabsPrimitive.List
         className={cn(
            "scrollbar-hidden lex mb-5 gap-3 overflow-x-auto",
            className,
         )}
         {...props}
      />
   )
}

function Tab({
   className,
   ...props
}: React.ComponentProps<typeof TabsPrimitive.Tab>) {
   return (
      <TabsPrimitive.Tab
         className={cn(
            "inline-flex h-8 cursor-pointer items-center justify-center whitespace-nowrap px-2 text-sm hover:bg-surface-12 hover:text-background aria-selected:bg-surface-12 aria-selected:text-background",
            "disabled:cursor-not-allowed disabled:opacity-75",
            focus(),
            className,
         )}
         {...props}
      />
   )
}

function Indicator({
   ...props
}: React.ComponentProps<typeof TabsPrimitive.Indicator>) {
   return <TabsPrimitive.Indicator {...props} />
}

function Panel({ ...props }: React.ComponentProps<typeof TabsPrimitive.Panel>) {
   return <TabsPrimitive.Panel {...props} />
}

export const Tabs = {
   Root,
   List,
   Tab,
   Indicator,
   Panel,
}
