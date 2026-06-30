import type { Dispatch, SetStateAction } from 'react';
import TodoView from './TodoView';
import type { Todo } from '../types';

const style = {
  todos: `[&>*:last-child]:border-0 [&>*:last-child]:pb-0`,
};

type TodoListViewProps = {
  todos: Todo[];
  setTodo: Dispatch<SetStateAction<string>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setTempUidd: Dispatch<SetStateAction<string>>;
};

const TodoListView = ({ todos, setTodo, setIsEdit, setTempUidd }: TodoListViewProps) => {
  return (
    <ul className={style.todos}>
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
