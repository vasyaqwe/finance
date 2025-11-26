import { mergeProps } from "@base-ui-components/react/merge-props"
import { useRender } from "@base-ui-components/react/use-render"
import { tv } from "tailwind-variants"
import { cn } from "@/ui/utils"

const root = tv({
   base: ["rounded-[2rem] bg-surface-2 p-4 shadow-inner/1 md:p-6"],
})

function Root(props: useRender.ComponentProps<"div">) {
   const { render = <div />, className, ...otherProps } = props

   return useRender({
      render,
      props: mergeProps<"div">(
         {
            className: root({ className }),
         },
         otherProps,
      ),
   })
}

function Title(props: useRender.ComponentProps<"p">) {
   const { render = <p />, className, ...otherProps } = props

   return useRender({
      render,
      props: mergeProps<"p">(
         {
            className: cn("font-medium leading-tight", className),
         },
         otherProps,
      ),
   })
}

function Description({ className, ...props }: React.ComponentProps<"p">) {
   return (
      <p
         className={cn("mt-0.5 text-muted text-sm", className)}
         {...props}
      />
   )
}

export const Card = {
   Root,
   Title,
   Description,
}
