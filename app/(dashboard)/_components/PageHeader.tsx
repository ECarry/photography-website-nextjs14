'use client'

import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  label: string;
  icon?: string;
  type: 'createPhoto' | 'createAlbum'
}

const PageHeader = ({
  title,
  label,
  type
}: PageHeaderProps) => {
  const { onOpen } = useModal()

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl md:text-4xl font-semibold">
        {title}
      </h1>
      <Button
        onClick={() => onOpen(type)}
        variant='primary'
      >
        <Plus size={16} className="mr-2" />
        {label}
      </Button>
    </div>
  )
}

export default PageHeader
