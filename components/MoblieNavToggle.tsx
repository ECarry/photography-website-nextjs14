import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const
 
type SheetSide = (typeof SHEET_SIDES)[number]

interface Link {
  label: string;
  link: string;
}

interface MoblieNavToggleProps {
  links: Link [];
  side: SheetSide;
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
