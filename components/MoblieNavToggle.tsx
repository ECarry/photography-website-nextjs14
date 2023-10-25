import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import NavbarItem from "@/app/(dashboard)/_components/NavbarItem";

interface Link {
  label: string;
  href: string;
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
        <div className="w-full flex flex-col items-center justify-center gap-4">
          {links.map(link => (
            <NavbarItem 
              key={link.label}
              label={link.label}
              href={link.href}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MoblieNavToggle
