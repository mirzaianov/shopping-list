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
import type { Todo } from '../../types';
import formStyles from '../../styles/form.module.css';
import { reorderShoppingItemsAction } from './shopping-list-actions';
import listStyles from './shopping-list.module.css';
import SortableItem from './sortable-item';

type SortableListProps = {
  todos: Todo[];
};

export default function SortableList({ todos }: SortableListProps) {
  const [items, setItems] = useState(todos);
  const [error, setError] = useState('');
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
    const result = await reorderShoppingItemsAction(nextItems.map((item) => item.id));

    if (result.error) {
      setItems(previousItems);
      setError(result.error);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
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

    setError('');
    setItems(nextItems);
    void saveOrder(previousItems, nextItems);
  };

  return (
    <>
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className={listStyles.todos}>
            {items.map((item) => (
              <SortableItem item={item} key={item.id} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <p className={formStyles.error} aria-live="polite">
        {error}
      </p>
    </>
  );
}
