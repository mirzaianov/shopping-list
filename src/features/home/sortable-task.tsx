'use client';

import { Menu } from '@base-ui/react/menu';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { EllipsisVertical, FilePen, GripVertical, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import IconTooltip from '../../components/icon-tooltip';
import type { Task } from '../../types';
import TaskDeleteDialog from './task-delete-dialog';

import buttonStyles from '../../components/button.module.css';
import styles from './task.module.css';

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

interface SortableTaskProps {
  onEdit: (task: Task) => void;
  reducedMotion: boolean;
  task: Task;
}

export default function SortableTask({ onEdit, reducedMotion, task }: SortableTaskProps) {
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
    id: task.id,
    transition: reducedMotion ? noMotionTransition : dragTransition,
  });
  const dragTransform = CSS.Translate.toString(transform);
  const taskTransition = [transition, reducedMotion ? undefined : visualTransition]
    .filter(Boolean)
    .join(', ');
  const style: CSSProperties = {
    transform: dragTransform,
    transition: taskTransition || undefined,
  };

  useEffect(() => {
    if (isDragging) {
      menuActionsRef.current?.close();
    }
  }, [isDragging]);

  return (
    <li className={clsx(styles.task, isDragging && styles.dragging)} ref={setNodeRef} style={style}>
      <IconTooltip label="Reorder task">
        <button
          aria-label="Reorder task"
          className={clsx(buttonStyles.button, styles.dragButton)}
          ref={setActivatorNodeRef}
          type="button"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={controlIconSize} />
        </button>
      </IconTooltip>
      <span className={styles.taskTitle}>{task.title}</span>
      <Menu.Root actionsRef={menuActionsRef}>
        <IconTooltip label="Task options">
          <Menu.Trigger
            aria-label="Task options"
            className={clsx(buttonStyles.button, styles.optionsButton)}
          >
            <EllipsisVertical size={controlIconSize} />
          </Menu.Trigger>
        </IconTooltip>
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
                onClick={() => onEdit(task)}
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
      <TaskDeleteDialog id={task.id} onOpenChange={setIsDeleteOpen} open={isDeleteOpen} />
    </li>
  );
}
