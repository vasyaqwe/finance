import "@/ui/styles.css"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import * as React from "react"
import ReactDOM from "react-dom/client"
import { ErrorComponent } from "@/ui/components/error"
import { NotFound } from "@/ui/components/not-found"
import { routeTree } from "./routeTree.gen"

const router = createRouter({
   routeTree,
   scrollRestoration: true,
   getScrollRestorationKey: (location) => location.pathname,
   context: {},
   defaultPreload: "render",
   defaultPreloadStaleTime: 0,
   defaultPreloadGcTime: 0,
   defaultNotFoundComponent: NotFound,
   defaultErrorComponent: ({ error }) => (
      <ErrorComponent
         className="pt-20 md:pt-40"
         error={{
            name: error.name,
            message: error.message,
         }}
      />
   ),
})

declare module "@tanstack/react-router" {
   interface Register {
      router: typeof router
   }
}

const rootElement = document.getElementById("app")!
if (!rootElement.innerHTML || rootElement.innerHTML.trim().length === 0) {
   const root = ReactDOM.createRoot(rootElement)
   root.render(
      <React.StrictMode>
         <RouterProvider router={router} />
      </React.StrictMode>,
   )
}
