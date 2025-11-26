import { useQueryErrorResetBoundary } from "@tanstack/react-query"
import {
   ClientOnly,
   type ErrorComponentProps,
   useRouter,
} from "@tanstack/react-router"
import * as React from "react"
import { createPortal } from "react-dom"
import { Button } from "@/ui/components/button"
import { cn } from "@/ui/utils"

interface Props
   extends Omit<ErrorComponentProps, "reset" | "error">,
      React.ComponentProps<"div"> {
   reset?: () => void
   error?: Error
}

export function ErrorComponent({ error, reset, className, ...props }: Props) {
   const router = useRouter()
   const queryErrorResetBoundary = useQueryErrorResetBoundary()

   React.useEffect(() => {
      queryErrorResetBoundary.reset()
   }, [queryErrorResetBoundary])

   return (
      <div
         className={cn(
            "flex grow flex-col items-center py-10 text-center",
            className,
         )}
         {...props}
      >
         <div>
            <h1 className="mb-3 text-xl">Something went wrong</h1>
            <p className="mb-4 text-balance font-medium text-red-9 text-sm">
               {"We are having technical difficulties. Please, try again."}
            </p>
            <Button
               variant={"secondary"}
               onClick={() => {
                  if (reset) return reset()
                  router.invalidate()
               }}
            >
               Try again
            </Button>
         </div>
         {import.meta.env.DEV && error ? (
            <ClientOnly>
               {createPortal(
                  <div className="fixed right-4 bottom-4 mx-auto mt-12 max-h-[400px] w-full max-w-[600px] overflow-auto rounded-md border border-neutral bg-surface-3 p-4 text-left">
                     <h2 className="mb-2 text-lg text-red-9">Error</h2>
                     {error.message}
                  </div>,
                  document.body,
               )}
            </ClientOnly>
         ) : null}
      </div>
   )
}
