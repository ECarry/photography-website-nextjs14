'use client'

import { useModal } from "@/hooks/use-modal-store"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "../ui/use-toast"

export default function DeletePhotoModal() {
  const { onClose, isOpen, type, data } = useModal()
  const router = useRouter()
  const pathname = usePathname()

  const { id, title } = data
  
  const isModalOpen = isOpen && type === 'deletePhoto'

  const handleDleteClick = async () => {
    await fetch(`/api/photos/${id}`,{
      method: 'DELETE',
      body: JSON.stringify({
        id
      })
    })
    .then((res) => {
      console.log(res);
      
      onClose()
      pathname === '/dashboard' ? router.refresh() : router.push('/dashboard')
      toast({
        title: "Deleted successed!",
        description: `${title} has been deleted.`
      })
    })
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete <span className="font-semibold">{title}</span> data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={onClose}>Cancel</Button>
          <Button variant='destructive' onClick={handleDleteClick} >Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
