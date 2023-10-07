'use client'

import { useModal } from '@/hooks/use-modal-store'

import ActionTooltip from '@/components/ActionTooltip'
import Icon from '@/components/icons'

interface DeleteActionProps {
  id: string;
  title: string;
}

const DeleteAction = ({
  id,
  title
}: DeleteActionProps) => {
  const { onOpen } = useModal()

  return (
    <ActionTooltip
      label='delete'
      side='top'
    >
      <button onClick={() => onOpen('deletePhoto', {id, title})}>
        <Icon
          name='trash'
          animated='HOVER'
          loop={false}
          size={28}
        />
      </button>
    </ActionTooltip>
  )
}

export default DeleteAction
