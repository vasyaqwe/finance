import { createFileRoute, Link, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout")({
   component: RouteComponent,
})

function RouteComponent() {
   return (
      <div className="mx-auto w-full max-w-4xl items-start px-3.5 pt-4 [--sidebar-height:340px] max-md:pb-8 md:flex md:pt-32">
         <div className="flex shrink-0 flex-col md:sticky md:top-9 md:h-(--sidebar-height) md:w-56">
            <nav className="max-md:mb-4">
               <ul className="md:before:-left-0.5 max-md:before:-ml-5 before:-bottom-px relative items-center gap-3 [--padding-block:4px] before:absolute before:h-px before:w-[calc(100%+2rem)] before:rounded-xs before:bg-neutral max-md:flex md:space-y-2.5 md:pl-1 md:before:top-0.5 md:before:h-[calc(100%-var(--padding-block))] md:before:w-0.5">
                  <li>
                     <Link
                        activeProps={{
                           className:
                              "opacity-100 before:block md:before:top-[calc(var(--padding-block)/2)] before:-bottom-[1px]",
                        }}
                        inactiveProps={{
                           className: "opacity-60 before:hidden",
                        }}
                        to={"/"}
                        className={
                           "group md:before:-left-1.5 relative flex items-center gap-2 px-1 font-medium leading-none transition-opacity duration-100 before:absolute before:left-0 before:h-0.5 before:w-full before:rounded-xs before:bg-foreground hover:opacity-100 max-md:pb-3 md:px-2 md:py-1 md:before:h-[calc(100%-var(--padding-block))] md:before:w-0.5"
                        }
                     >
                        Transactions
                     </Link>
                  </li>
                  <li>
                     <Link
                        activeProps={{
                           className:
                              "opacity-100 before:block md:before:bottom-[calc(var(--padding-block)/2)] before:-bottom-[1px]",
                        }}
                        inactiveProps={{
                           className: "opacity-60 before:hidden",
                        }}
                        to={"/cashflow"}
                        className={
                           "group md:before:-left-1.5 relative flex items-center gap-2 px-1 font-medium leading-none transition-opacity duration-100 before:absolute before:left-0 before:h-0.5 before:w-full before:rounded-xs before:bg-foreground hover:opacity-100 max-md:pb-3 md:px-2 md:py-1 md:before:h-[calc(100%-var(--padding-block))] md:before:w-0.5"
                        }
                     >
                        Cashflow
                     </Link>
                  </li>
                  <li>
                     <Link
                        preload={"render"}
                        activeProps={{
                           className:
                              "opacity-100 before:block md:before:bottom-[calc(var(--padding-block)/2)] before:-bottom-[1px]",
                        }}
                        inactiveProps={{
                           className: "opacity-60 before:hidden",
                        }}
                        to={"/settings"}
                        className={
                           "group md:before:-left-1.5 relative flex items-center gap-2 px-1 font-medium leading-none transition-opacity duration-100 before:absolute before:left-0 before:h-0.5 before:w-full before:rounded-xs before:bg-foreground hover:opacity-100 max-md:pb-3 md:px-2 md:py-1 md:before:h-[calc(100%-var(--padding-block))] md:before:w-0.5"
                        }
                     >
                        Settings
                     </Link>
                  </li>
               </ul>
            </nav>
         </div>
         <main
            className={
               "relative flex min-h-(--sidebar-height) flex-1 flex-col md:pb-20"
            }
         >
            <Outlet />
         </main>
      </div>
   )
}
