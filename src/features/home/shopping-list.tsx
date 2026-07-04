import type { Todo } from '../../types';
import SortableList from './sortable-list';

type ShoppingListProps = {
  todos: Todo[];
};

export default function ShoppingList({ todos }: ShoppingListProps) {
  return <SortableList todos={todos} />;
}
