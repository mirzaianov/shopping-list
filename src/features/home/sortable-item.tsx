'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { EllipsisVertical, FilePen, GripVertical, Trash2 } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Menu } from '@base-ui/react/menu';
import clsx from 'clsx';
import buttonStyles from '../../components/button.module.css';
import type { Todo } from '../../types';
import styles from './shopping-item.module.css';
import TodoDeleteDialog from './todo-delete-dialog';

const actionIconSize = 20;
const controlIconSize = 24;
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
  onEdit: (item: Todo) => void;
  reducedMotion: boolean;
};

export default function SortableItem({ item, onEdit, reducedMotion }: SortableItemProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const menuActionsRef = useRef<Menu.Root.Actions | null>(null);
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
  useEffect(() => {
    if (isDragging) {
      menuActionsRef.current?.close();
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
        <GripVertical size={controlIconSize} />
      </button>
      <span className={styles.todoName}>{item.todo}</span>
      <Menu.Root actionsRef={menuActionsRef}>
        <Menu.Trigger
          aria-label="Todo options"
          className={clsx(buttonStyles.button, styles.optionsButton)}
          title="Todo options"
        >
          <EllipsisVertical size={controlIconSize} />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner
            align="end"
            className={styles.optionsPositioner}
            side="bottom"
            sideOffset={4}
          >
            <Menu.Popup className={styles.optionsPanel}>
              <Menu.Item
                className={clsx(
                  buttonStyles.button,
                  buttonStyles.action,
                  buttonStyles.fullWidth,
                  buttonStyles.primary,
                )}
                onClick={() => onEdit(item)}
                title="Edit the item"
              >
                <span className={buttonStyles.buttonTop}>
                  <FilePen size={actionIconSize} />
                  Edit
                </span>
              </Menu.Item>
              <Menu.Item
                className={clsx(
                  buttonStyles.button,
                  buttonStyles.action,
                  buttonStyles.fullWidth,
                  buttonStyles.destructive,
                )}
                onClick={() => setIsDeleteOpen(true)}
                title="Delete the item"
              >
                <span className={buttonStyles.buttonTop}>
                  <Trash2 size={actionIconSize} />
                  Delete
                </span>
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
      <TodoDeleteDialog id={item.id} onOpenChange={setIsDeleteOpen} open={isDeleteOpen} />
    </li>
  );
}
