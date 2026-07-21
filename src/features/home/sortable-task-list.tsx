'use client';

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { toast } from '../../components/toast-provider';
import type { Task } from '../../types';
import SortableTask from './sortable-task';
import { reorderTasksAction } from './task-actions';
import TaskEditDialog from './task-edit-dialog';

import listStyles from './task-list.module.css';

interface SortableTaskListProps {
  tasks: Task[];
}

const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => setReducedMotion(media.matches);

    syncMotionPreference();
    media.addEventListener('change', syncMotionPreference);

    return () => media.removeEventListener('change', syncMotionPreference);
  }, []);

  return reducedMotion;
};

export default function SortableTaskList({ tasks }: SortableTaskListProps) {
  const [previousTasks, setPreviousTasks] = useState(tasks);
  const [orderedTasks, setOrderedTasks] = useState(tasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const reducedMotion = useReducedMotion();
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 180, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const reorderMutation = useMutation({
    mutationFn: ({ nextTasks }: { nextTasks: Task[]; previousTasks: Task[] }) =>
      reorderTasksAction(nextTasks.map((task) => task.id)),
    onError: (_error, { previousTasks: previousOrder }) => {
      setOrderedTasks(previousOrder);
      toast.error('Task order could not be saved. Please refresh and try again.');
    },
    onSuccess: (result, { previousTasks: previousOrder }) => {
      if (result.error) {
        setOrderedTasks(previousOrder);
        toast.error(result.error);
      }
    },
  });

  if (tasks !== previousTasks) {
    setPreviousTasks(tasks);
    setOrderedTasks(tasks);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);

    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = orderedTasks.findIndex((task) => task.id === active.id);
    const newIndex = orderedTasks.findIndex((task) => task.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const previousOrder = orderedTasks;
    const nextTasks = arrayMove(orderedTasks, oldIndex, newIndex);

    setOrderedTasks(nextTasks);
    reorderMutation.mutate({ nextTasks, previousTasks: previousOrder });
  };

  return (
    <>
      <DndContext
        collisionDetection={closestCenter}
        id="task-list-sortable"
        modifiers={[restrictToVerticalAxis]}
        onDragCancel={() => setIsDragging(false)}
        onDragEnd={handleDragEnd}
        onDragStart={() => setIsDragging(true)}
        sensors={sensors}
      >
        <SortableContext
          items={orderedTasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className={clsx(listStyles.tasks, isDragging && listStyles.dragging)}>
            {orderedTasks.map((task) => (
              <SortableTask
                key={task.id}
                onEdit={setEditingTask}
                reducedMotion={reducedMotion}
                task={task}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <TaskEditDialog editingTask={editingTask} onClose={() => setEditingTask(null)} />
    </>
  );
}
