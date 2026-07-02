import type { Dispatch, SetStateAction } from 'react';
import TodoView from './todo-view';
import type { Todo } from '../types';
import styles from './todo-list-view.module.css';

type TodoListViewProps = {
  todos: Todo[];
  setTodo: Dispatch<SetStateAction<string>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setTempId: Dispatch<SetStateAction<string>>;
  handleDelete: (id: string) => void;
};

const TodoListView = ({
  todos,
  setTodo,
  setIsEdit,
  setTempId,
  handleDelete,
}: TodoListViewProps) => {
  return (
    <ul className={styles.todos}>
      {todos.map((item) => (
        <TodoView
          key={item.id}
          item={item}
          setTodo={setTodo}
          setIsEdit={setIsEdit}
          setTempId={setTempId}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default TodoListView;
