import { Menu as MenuPrimitive } from "@base-ui-components/react/menu"
import type { VariantProps } from "tailwind-variants"
import { Icons } from "@/ui/components/icons"
import { menuItem } from "@/ui/components/menu/style"
import { popup } from "@/ui/popup"
import { cn } from "@/ui/utils"

const Root = MenuPrimitive.Root
const Trigger = MenuPrimitive.Trigger
const Group = MenuPrimitive.Group
const RadioItem = MenuPrimitive.RadioItem
const Portal = MenuPrimitive.Portal
const Backdrop = MenuPrimitive.Backdrop
const Positioner = MenuPrimitive.Positioner

function TriggerIcon() {
   return (
      <Icons.chevronUpDown className="ml-auto flex size-4.5 shrink-0 text-foreground/60" />
   )
}

function GroupLabel({
   className,
   children,
   ...props
}: React.ComponentProps<typeof MenuPrimitive.GroupLabel>) {
   return (
      <MenuPrimitive.GroupLabel
         className={popup({
            className: typeof className === "string" ? className : undefined,
         }).groupLabel()}
         {...props}
      >
         {children}
      </MenuPrimitive.GroupLabel>
   )
}

interface ItemProps
   extends React.ComponentProps<typeof MenuPrimitive.Item>,
      VariantProps<typeof menuItem> {}

function Item({ className, variant, children, ...props }: ItemProps) {
   return (
      <MenuPrimitive.Item
         className={menuItem({
            variant,
            className: typeof className === "string" ? className : undefined,
         })}
         {...props}
      >
         {children}
      </MenuPrimitive.Item>
   )
}

function CheckboxItem({
   className,
   children,
   ...props
}: React.ComponentProps<typeof MenuPrimitive.Item>) {
   return (
      <MenuPrimitive.CheckboxItem
         className={menuItem({
            variant: "checkbox",
            className: typeof className === "string" ? className : undefined,
         })}
         {...props}
      >
         <MenuPrimitive.CheckboxItemIndicator className="col-start-1">
            <Icons.check className={"size-[18px]"} />
         </MenuPrimitive.CheckboxItemIndicator>
         <span className={"col-start-2"}>{children}</span>
      </MenuPrimitive.CheckboxItem>
   )
}

function Popup({
   className,
   children,
   sideOffset = 7,
   ...props
}: React.ComponentProps<typeof MenuPrimitive.Positioner>) {
   return (
      <Portal>
         <Backdrop />
         <Positioner
            sideOffset={sideOffset}
            {...props}
         >
            <MenuPrimitive.Popup
               className={cn(
                  popup().base(),
                  popup().transition(),
                  "min-w-36 p-(--popup-padding) text-base",
                  className,
               )}
            >
               {children}
            </MenuPrimitive.Popup>
         </Positioner>
      </Portal>
   )
}

function Separator({
   className,
   ...props
}: React.ComponentProps<typeof MenuPrimitive.Separator>) {
   return (
      <MenuPrimitive.Separator
         className={popup({
            className: typeof className === "string" ? className : undefined,
         }).separator()}
         {...props}
      />
   )
}

export const Menu = {
   Root,
   Trigger,
   Group,
   RadioItem,
   TriggerIcon,
   GroupLabel,
   Item,
   CheckboxItem,
   Popup,
   Separator,
}
