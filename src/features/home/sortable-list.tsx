'use client';

import { useEffect, useState } from 'react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type DragEndEvent,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import clsx from 'clsx';
import { toast } from 'sonner';
import type { Todo } from '../../types';
import { reorderShoppingItemsAction } from './shopping-list-actions';
import listStyles from './shopping-list.module.css';
import SortableItem from './sortable-item';

type SortableListProps = {
  todos: Todo[];
};

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => setReducedMotion(media.matches);

    syncMotionPreference();
    media.addEventListener('change', syncMotionPreference);
    return () => media.removeEventListener('change', syncMotionPreference);
  }, []);

  return reducedMotion;
}

export default function SortableList({ todos }: SortableListProps) {
  const [items, setItems] = useState(todos);
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

  useEffect(() => {
    setItems(todos);
  }, [todos]);

  const saveOrder = async (previousItems: Todo[], nextItems: Todo[]) => {
    try {
      const result = await reorderShoppingItemsAction(nextItems.map((item) => item.id));

      if (result.error) {
        setItems(previousItems);
        toast.error(result.error);
      }
    } catch {
      setItems(previousItems);
      toast.error('Todo order could not be saved. Please refresh and try again.');
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);

    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    if (oldIndex < 0 || newIndex < 0) {
      return;
    }

    const previousItems = items;
    const nextItems = arrayMove(items, oldIndex, newIndex);

    setItems(nextItems);
    void saveOrder(previousItems, nextItems);
  };

  return (
    <>
      <DndContext
        collisionDetection={closestCenter}
        id="shopping-list-sortable"
        modifiers={[restrictToVerticalAxis]}
        onDragCancel={() => setIsDragging(false)}
        onDragEnd={handleDragEnd}
        onDragStart={() => setIsDragging(true)}
        sensors={sensors}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className={clsx(listStyles.todos, isDragging && listStyles.dragging)}>
            {items.map((item) => (
              <SortableItem item={item} key={item.id} reducedMotion={reducedMotion} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </>
  );
}
