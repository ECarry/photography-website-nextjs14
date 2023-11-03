'use client'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  desc?: string;
  label?: string;
  id?: string;
  type?: 'createPhoto' | 'createAlbum';
  showButton?: boolean;
}

const PageHeader = ({
  title,
  desc,
  label,
  type,
  id,
  showButton=true,
}: PageHeaderProps) => {
  const { onOpen } = useModal()

  const data = {
    id
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">
            {desc}
          </p>
        </div>
        
        {showButton && type && (
          <Button
          onClick={() => onOpen(type, data)}
          variant='primary'
        >
          <Plus size={16} className="mr-2" />
          {label}
        </Button>
        )}
        
      </div>
      <Separator className="my-6" />
    </>
  )
}

export default PageHeader
