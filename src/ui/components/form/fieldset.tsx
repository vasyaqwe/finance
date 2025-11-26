import { Fieldset as FieldsetPrimitive } from "@base-ui-components/react/fieldset"
import { cn } from "@/ui/utils"

function Root({
   ...props
}: React.ComponentProps<typeof FieldsetPrimitive.Root>) {
   return <FieldsetPrimitive.Root {...props} />
}

function Legend({
   className,
   ...props
}: React.ComponentProps<typeof FieldsetPrimitive.Legend>) {
   return (
      <FieldsetPrimitive.Legend
         className={cn("-mt-1 mb-4 font-medium text-lg", className)}
         {...props}
      />
   )
}

export const Fieldset = {
   Root,
   Legend,
}
