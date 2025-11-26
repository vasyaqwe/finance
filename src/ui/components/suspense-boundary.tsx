import { CatchBoundary } from "@tanstack/react-router"
import * as React from "react"
import { ErrorComponent } from "@/ui/components/error"
import { Loading } from "@/ui/components/loading"

export function SuspenseBoundary({
   children,
   fallback,
   errorComponent,
}: {
   children: React.ReactNode
   fallback?: React.ReactNode
   errorComponent?: React.ReactNode
}) {
   return (
      <CatchBoundary
         getResetKey={() => "reset"}
         errorComponent={
            errorComponent !== undefined
               ? () => errorComponent
               : (props) => (
                    <ErrorComponent
                       error={props.error}
                       reset={props.reset}
                    />
                 )
         }
      >
         <React.Suspense
            fallback={
               fallback === "undefined" ? <SuspenseFallback /> : fallback
            }
         >
            {children}
         </React.Suspense>
      </CatchBoundary>
   )
}

export function SuspenseFallback() {
   return (
      <Loading
         size={"xl"}
         className="absolute! inset-0 m-auto"
      />
   )
}
