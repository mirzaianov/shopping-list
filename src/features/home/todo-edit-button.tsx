'use client';

import { FilePen } from 'lucide-react';
import clsx from 'clsx';
import Button from '../../components/button';
import buttonStyles from '../../components/button.module.css';
import { useStore } from '../../store/store';

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
      styling={clsx(buttonStyles.action, buttonStyles.actionFull, buttonStyles.outline)}
      text="Edit"
      title="Edit the item"
      type="button"
    />
  );
}
