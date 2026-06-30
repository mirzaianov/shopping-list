import type { Dispatch, SetStateAction } from 'react';
import TodoView from './todo-view';
import type { Todo } from '../types';
import styles from './todo-list-view.module.css';

type TodoListViewProps = {
  todos: Todo[];
  setTodo: Dispatch<SetStateAction<string>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setTempUidd: Dispatch<SetStateAction<string>>;
};

const TodoListView = ({ todos, setTodo, setIsEdit, setTempUidd }: TodoListViewProps) => {
  return (
    <ul className={styles.todos}>
      {todos.map((item) => (
        <TodoView
          key={item.uidd}
          item={item}
          setTodo={setTodo}
          setIsEdit={setIsEdit}
          setTempUidd={setTempUidd}
        />
      ))}
    </ul>
  );
};

export default TodoListView;
