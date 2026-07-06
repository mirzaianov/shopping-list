'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { HiMiniEllipsisVertical, HiMiniXCircle } from 'react-icons/hi2';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import Button from '../../components/button';
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
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
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
  const dragTransform = CSS.Translate.toString(transform);
  const itemTransition = [transition, reducedMotion ? undefined : visualTransition]
    .filter(Boolean)
    .join(', ');
  const style: CSSProperties = {
    transform: dragTransform,
    transition: itemTransition || undefined,
  };
  const optionsId = `todo-options-${item.id}`;

  useEffect(() => {
    if (!isOptionsOpen) {
      return;
    }

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!optionsRef.current?.contains(event.target as Node)) {
        setIsOptionsOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOptionsOpen(false);
      }
    };

    document.addEventListener('pointerdown', closeOnOutsidePointer);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOptionsOpen]);

  useEffect(() => {
    if (isDragging) {
      setIsOptionsOpen(false);
    }
  }, [isDragging]);

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
        <PiDotsSixVerticalBold size={buttonSmall} />
      </button>
      <h3 className={styles.todoName}>{item.todo}</h3>
      <div className={styles.options} ref={optionsRef}>
        <button
          aria-controls={optionsId}
          aria-expanded={isOptionsOpen}
          className={clsx(buttonStyles.button, styles.optionsButton)}
          onClick={() => setIsOptionsOpen((current) => !current)}
          title="Todo options"
          type="button"
        >
          <HiMiniEllipsisVertical size={buttonSmall} />
        </button>
        {isOptionsOpen && (
          <div className={styles.optionsPanel} id={optionsId}>
            <TodoEditButton
              id={item.id}
              onEditStart={() => setIsOptionsOpen(false)}
              todo={item.todo}
            />
            <form
              action={deleteShoppingItemFormAction}
              className={styles.deleteForm}
              onSubmit={() => setIsOptionsOpen(false)}
            >
              <input name="id" type="hidden" value={item.id} />
              <Button
                icon={<HiMiniXCircle size={buttonSmall} />}
                styling={clsx(styles.menuActionButton, styles.menuDeleteButton)}
                text="Delete"
                title="Delete the item"
                type="submit"
              />
            </form>
          </div>
        )}
      </div>
    </li>
  );
}
