import { HiMiniXCircle } from 'react-icons/hi2';
import clsx from 'clsx';
import buttonStyles from '../../components/button.module.css';
import type { Todo } from '../../types';
import { deleteShoppingItemFormAction } from './shopping-list-actions';
import styles from './shopping-item.module.css';
import listStyles from './shopping-list.module.css';
import TodoEditButton from './todo-edit-button';

const buttonSmall = 24;

type ShoppingListProps = {
  todos: Todo[];
};

export default function ShoppingList({ todos }: ShoppingListProps) {
  return (
    <ul className={listStyles.todos}>
      {todos.map((item) => (
        <li className={styles.todo} key={item.id}>
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
      ))}
    </ul>
  );
}
