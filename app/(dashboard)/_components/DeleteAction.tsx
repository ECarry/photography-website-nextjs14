'use client'

import { useModal } from '@/hooks/use-modal-store'

import ActionTooltip from '@/components/ActionTooltip'
import Icon from '@/components/icons'

interface DeleteActionProps {
  id: string;
  title: string;
  type: 'photos' | 'albums';
}

const DeleteAction = ({
  id,
  title,
  type
}: DeleteActionProps) => {
  const { onOpen } = useModal()

  const deleteType = type === 'photos' ? 'deletePhoto' : 'deleteAlbum'

  return (
    <ActionTooltip
      label='delete'
      side='top'
    >
      <button onClick={() => onOpen(deleteType, {id, title})}>
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
