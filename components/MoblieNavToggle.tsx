import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

interface Link {
  label: string;
  link: string;
}

interface MoblieNavToggleProps {
  links: Link [];
  side: "top"| "right"| "bottom"| "left";
}

const MoblieNavToggle = ({
  links,
  side
}: MoblieNavToggleProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className='p-0 flex gap-0'>
        links
      </SheetContent>
    </Sheet>
  )
}

export default MoblieNavToggle
