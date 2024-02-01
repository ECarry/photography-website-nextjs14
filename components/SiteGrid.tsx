import { cn } from "@/lib/utils"

export default function SiteGrid({
  className,
  contentMain,
  contentSide,
  sideFirstOnMobile,
  sideHiddenOnMobile,
}: {
  className?: string
  contentMain: JSX.Element
  contentSide?: JSX.Element
  sideFirstOnMobile?: boolean
  sideHiddenOnMobile?: boolean
}) {
  return (
    <div className={cn(
      className,
      'grid',
      'grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-4',
      'max-w-7xl',
    )}>
      <div className={cn(
        'col-span-1 lg:col-span-9',
        sideFirstOnMobile && 'order-2 lg:order-none',
      )}>
        {contentMain}
      </div>
      {contentSide &&
        <div className={cn(
          'col-span-1 lg:col-span-3',
          sideFirstOnMobile && 'order-1 lg:order-none',
          sideHiddenOnMobile && 'hidden lg:block',
        )}>
          {contentSide}
        </div>}
    </div>
  );
};
