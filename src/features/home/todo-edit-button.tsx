'use client';

import { HiMiniPencilSquare } from 'react-icons/hi2';
import clsx from 'clsx';
import buttonStyles from '../../components/button.module.css';
import styles from './shopping-item.module.css';
import { useShoppingListStore } from './shopping-list-store';

const buttonSmall = 24;

type TodoEditButtonProps = {
  id: string;
  todo: string;
};

export default function TodoEditButton({ id, todo }: TodoEditButtonProps) {
  const startEdit = useShoppingListStore((state) => state.startEdit);

  return (
    <button
      className={clsx(buttonStyles.button, styles.updateButton)}
      onClick={() => startEdit({ id, todo })}
      type="button"
      title="Edit the item"
    >
      <HiMiniPencilSquare size={buttonSmall} />
    </button>
  );
}
