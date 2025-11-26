import { cn } from "@/ui/utils"

function Root({ className, children, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         className={cn(
            "scrollbar-hidden relative w-full grow md:overflow-x-auto",
            className,
         )}
         {...props}
      >
         <style>
            {`
               td::before {
                  content: attr(data-thead) !important;
               }
            `}
         </style>
         <table className={"w-full border-collapse md:text-sm"}>
            {children}
         </table>
      </div>
   )
}

function Header({ className, ...props }: React.ComponentProps<"thead">) {
   return (
      <thead
         className={cn("text-left max-md:hidden", className)}
         {...props}
      />
   )
}

function Body({ ...props }: React.ComponentProps<"tbody">) {
   return <tbody {...props} />
}

function Row({ className, ...props }: React.ComponentProps<"tr">) {
   return (
      <tr
         className={cn(
            "relative border-neutral border-t first:border-t-transparent has-[th]:border-none max-md:flex max-md:flex-col max-md:p-1",
            className,
         )}
         {...props}
      />
   )
}

function Head({ className, ...props }: React.ComponentProps<"th">) {
   return (
      <th
         className={cn(
            "whitespace-nowrap px-4 py-2 font-medium text-muted last:pr-5 md:first:pl-5 lg:first:pl-8 xl:first:pl-10",
            className,
         )}
         {...props}
      />
   )
}

function Cell({ className, ...props }: React.ComponentProps<"td">) {
   return (
      <td
         className={cn(
            "grid-cols-[125px_1fr] items-center px-4 py-2.5 before:font-medium before:font-primary before:text-muted before:text-sm before:uppercase last:pr-5 max-md:grid max-md:w-full md:whitespace-nowrap md:py-3 md:first:pl-5 md:before:hidden lg:first:pl-8 xl:first:pl-10",
            className,
         )}
         {...props}
      />
   )
}

// function CellMenu({
//    children,
//    className,
//    ...props
// }: React.ComponentProps<typeof Button>) {
//    return (
//       <Cell
//          className="md:relative md:min-w-12"
//          onClick={(e) => e.stopPropagation()}
//       >
//          <Menu.Root>
//             <Menu.Trigger
//                render={
//                   <Button
//                      variant={"ghost"}
//                      kind={"icon"}
//                      className="absolute top-1 right-1 md:inset-0 md:m-auto"
//                      {...props}
//                   >
//                      <Icons.ellipsis />
//                   </Button>
//                }
//             />
//             {children}
//          </Menu.Root>
//       </Cell>
//    )
// }

function Separator({
   className,
   children,
   ...props
}: React.ComponentProps<"tr">) {
   return (
      <tr
         className={cn("w-full border-neutral border-t text-muted", className)}
         {...props}
      >
         <td
            colSpan={10}
            className="bg-surface-2 py-1.5 pl-5 lg:pl-8 xl:pl-10"
         >
            {children}
         </td>
      </tr>
   )
}

export const Table = {
   Root,
   Header,
   Body,
   Row,
   Head,
   Cell,
   Separator,
}
