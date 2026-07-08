'use client';

import { FilePen } from 'lucide-react';
import clsx from 'clsx';
import Button from '../../components/button';
import { useStore } from '../../store/store';
import styles from './shopping-item.module.css';

const buttonSmall = 20;

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
      icon={<FilePen size={buttonSmall} />}
      styling={clsx(styles.menuActionButton, styles.menuOutlineButton)}
      text="Edit"
      title="Edit the item"
      type="button"
    />
  );
}
