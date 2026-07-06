'use client';

import { HiMiniPencilSquare } from 'react-icons/hi2';
import Button from '../../components/button';
import { useStore } from '../../store/store';
import styles from './shopping-item.module.css';

const buttonSmall = 24;

type TodoEditButtonProps = {
  id: string;
  onEditStart?: () => void;
  todo: string;
};

export default function TodoEditButton({ id, onEditStart, todo }: TodoEditButtonProps) {
  const startEdit = useStore((state) => state.startEdit);

  return (
    <Button
      handleOnClick={() => {
        startEdit({ id, todo });
        onEditStart?.();
      }}
      icon={<HiMiniPencilSquare size={buttonSmall} />}
      styling={styles.menuActionButton}
      text="Edit"
      title="Edit the item"
      type="button"
    />
  );
}
