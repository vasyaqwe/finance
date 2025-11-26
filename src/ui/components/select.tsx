import { Select as SelectPrimitive } from "@base-ui-components/react/select"
import { Button } from "@/ui/components/button"
import { Icons } from "@/ui/components/icons"
import { menuItem } from "@/ui/components/menu/style"
import { popup } from "@/ui/popup"
import { cn } from "@/ui/utils"

const Root = SelectPrimitive.Root
const Icon = SelectPrimitive.Icon
const ItemIndicator = SelectPrimitive.ItemIndicator
const ItemText = SelectPrimitive.ItemText
const Group = SelectPrimitive.Group
const Portal = SelectPrimitive.Portal
const Backdrop = SelectPrimitive.Backdrop
const Positioner = SelectPrimitive.Positioner

function Value({
   className,
   ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
   return (
      <SelectPrimitive.Value
         className={cn("line-clamp-1 first-letter:capitalize", className)}
         {...props}
      />
   )
}

function GroupLabel({
   className,
   children,
   ...props
}: React.ComponentProps<typeof SelectPrimitive.GroupLabel>) {
   return (
      <SelectPrimitive.GroupLabel
         className={popup({
            className: typeof className === "string" ? className : undefined,
         }).groupLabel()}
         {...props}
      >
         {children}
      </SelectPrimitive.GroupLabel>
   )
}

interface TriggerProps
   extends React.ComponentProps<typeof SelectPrimitive.Trigger> {}

function Trigger({ children, className, ...props }: TriggerProps) {
   return (
      <SelectPrimitive.Trigger
         onPointerDown={(e) => {
            e.stopPropagation()
         }}
         className={cn("justify-start gap-1.5", className)}
         render={
            <Button variant={"secondary"}>
               {children ?? (
                  <>
                     <Select.Value />
                     <Select.TriggerIcon />
                  </>
               )}
            </Button>
         }
         nativeButton
         {...props}
      />
   )
}

function TriggerIcon() {
   return (
      <Icon
         data-icon
         className="-mr-1.5 ml-auto flex shrink-0"
      >
         <Icons.chevronUpDown className="size-4.5" />
      </Icon>
   )
}

interface ItemProps extends React.ComponentProps<typeof SelectPrimitive.Item> {}

function Item({ className, children, ...props }: ItemProps) {
   return (
      <SelectPrimitive.Item
         className={menuItem({
            className: [
               "grid min-w-(--anchor-width) grid-cols-[var(--icon-size)_1fr] items-center gap-2 [--icon-size:1.25rem] group-data-[side=none]:min-w-[calc(var(--anchor-width)+var(--icon-size)+0.25rem)]",
               typeof className === "string" ? className : undefined,
            ],
         })}
         {...props}
      >
         <ItemIndicator className="col-start-1">
            <Icons.check className={"size-(--icon-size)"} />
         </ItemIndicator>
         <ItemText
            className={"col-start-2 font-normal first-letter:capitalize"}
         >
            {children}
         </ItemText>
      </SelectPrimitive.Item>
   )
}

function Popup({
   className,
   children,
   sideOffset = 0,
   ...props
}: React.ComponentProps<typeof SelectPrimitive.Positioner>) {
   return (
      <Portal>
         <Backdrop />
         <Positioner
            sideOffset={sideOffset}
            className={"group z-51"}
            {...props}
         >
            <SelectPrimitive.Popup
               className={popup().base({
                  className: [
                     typeof className === "string" ? className : undefined,
                  ],
               })}
            >
               {children}
            </SelectPrimitive.Popup>
         </Positioner>
      </Portal>
   )
}

function Separator({
   className,
   ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
   return (
      <SelectPrimitive.Separator
         className={popup({
            className: typeof className === "string" ? className : undefined,
         }).separator()}
         {...props}
      />
   )
}

export const Select = {
   Root,
   Icon,
   Group,
   Value,
   GroupLabel,
   Trigger,
   TriggerIcon,
   Item,
   Popup,
   Separator,
}
