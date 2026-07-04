'use client';

import type { CSSProperties } from 'react';
import { HiMiniBars3, HiMiniXCircle } from 'react-icons/hi2';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import buttonStyles from '../../components/button.module.css';
import type { Todo } from '../../types';
import { deleteShoppingItemFormAction } from './shopping-list-actions';
import styles from './shopping-item.module.css';
import TodoEditButton from './todo-edit-button';

const buttonSmall = 24;

type SortableItemProps = {
  item: Todo;
};

export default function SortableItem({ item }: SortableItemProps) {
  const {
    attributes,
    isDragging,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li className={clsx(styles.todo, isDragging && styles.dragging)} ref={setNodeRef} style={style}>
      <button
        className={clsx(buttonStyles.button, styles.dragButton)}
        ref={setActivatorNodeRef}
        type="button"
        title="Reorder todo"
        {...attributes}
        {...listeners}
      >
        <HiMiniBars3 size={buttonSmall} />
      </button>
      <h3 className={styles.todoName}>{item.todo}</h3>
      <TodoEditButton id={item.id} todo={item.todo} />
      <form action={deleteShoppingItemFormAction} className={styles.deleteForm}>
        <input name="id" type="hidden" value={item.id} />
        <button
          className={clsx(buttonStyles.button, styles.deleteButton)}
          type="submit"
          title="Delete the item"
        >
          <HiMiniXCircle size={buttonSmall} />
        </button>
      </form>
    </li>
  );
}
