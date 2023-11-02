'use client'

import { useModal } from "@/hooks/use-modal-store"

const ShimmerButton = () => {
  const { onOpen } = useModal()
  return (
    <button
    onClick={() => onOpen('createPhoto')}
      type='button'
      className='
      flex
      gap-2
      items-center
      py-2
      px-4
      rounded-full
      bg-[conic-gradient(from_var(--shimmer-angle),theme(colors.slate.950)_0%,theme(colors.slate.500)_10%,theme(colors.slate.950)_20%)]
      animate-[shimmer_3s_linear_infinite]
      relative
      after:absolute
      after:flex
      after:items-center
      after:justify-center
      after:text-white
      dark:after:text-black
      after:text-sm
      after:inset-[2px]
      after:rounded-full
      after:bg-primary
      after:content-[attr(aria-label)]
      '
      aria-label="+ New Photo"
    >
      <p className="opacity-0">+ New Photo</p>
    </button>
  )
}

export default ShimmerButton
