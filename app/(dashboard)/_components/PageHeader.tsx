import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  onClick: () => void;
}

const PageHeader = ({
  title,
  onClick
}: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-semibold">
        {title}
      </h1>
      <Button>
        <Plus size={16} className="mr-2" />
        Add Photo
      </Button>
    </div>
  )
}

export default PageHeader
