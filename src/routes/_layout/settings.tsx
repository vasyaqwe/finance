import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router"
import { Plus } from "iconoir-react"
import { transactionDelete } from "@/transaction/functions"
import { Button } from "@/ui/components/button"
import { FileTrigger } from "@/ui/components/file-trigger"

export const Route = createFileRoute("/_layout/settings")({
   component: RouteComponent,
})

function RouteComponent() {
   const navigate = useNavigate()
   const router = useRouter()

   return (
      <div className="grid grid-cols-2 items-center gap-2 sm:flex">
         <FileTrigger
            variant="secondary"
            onChange={(e) => {
               const formData = new FormData()
               const file = e.target.files?.[0]
               if (!file) return
               formData.append("file", file)
               // importData.mutate({ data: formData })
            }}
         >
            <Plus /> Import data
         </FileTrigger>
         <Button
            variant="destructive"
            onClick={() => {
               if (confirm("Are you sure?"))
                  transactionDelete().then(() => {
                     navigate({ to: "/" })
                     router.invalidate()
                  })
            }}
         >
            Clear all data
         </Button>
      </div>
   )
}
