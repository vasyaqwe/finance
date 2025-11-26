import { Link } from "@tanstack/react-router"
import { Button } from "@/ui/components/button"

export function NotFound() {
   return (
      <div className="flex grow flex-col items-center pt-20 text-center md:pt-40">
         <h1 className="mb-2 text-xl">Not found</h1>
         <p className="mb-5 text-lg text-muted">
            This page does not exist — <br /> it may have been moved or deleted.
         </p>
         <Button render={<Link to={"/"}>Back home</Link>} />
      </div>
   )
}
