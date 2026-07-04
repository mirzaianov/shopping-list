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
const dragTransition = {
  duration: 260,
  easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};
const noMotionTransition = {
  duration: 0,
  easing: 'linear',
};
const visualTransition =
  'background-color 180ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 180ms cubic-bezier(0.23, 1, 0.32, 1), opacity 180ms cubic-bezier(0.23, 1, 0.32, 1)';

type SortableItemProps = {
  item: Todo;
  reducedMotion: boolean;
};

export default function SortableItem({ item, reducedMotion }: SortableItemProps) {
  const {
    attributes,
    isDragging,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: item.id,
    transition: reducedMotion ? noMotionTransition : dragTransition,
  });
  const dragTransform = CSS.Transform.toString(transform);
  const itemTransition = [transition, reducedMotion ? undefined : visualTransition]
    .filter(Boolean)
    .join(', ');
  const itemTransform = [dragTransform, isDragging && 'scale(1.02)'].filter(Boolean).join(' ');
  const style: CSSProperties = {
    transform: itemTransform || undefined,
    transition: itemTransition || undefined,
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
