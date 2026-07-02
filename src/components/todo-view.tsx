import type { Dispatch, SetStateAction } from 'react';
import { HiMiniPencilSquare, HiMiniXCircle } from 'react-icons/hi2';
import Button from './button';
import type { Todo } from '../types';
import styles from './todo-view.module.css';

const buttonSmall = 24;

type TodoViewProps = {
  item: Todo;
  setTodo: Dispatch<SetStateAction<string>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setTempId: Dispatch<SetStateAction<string>>;
  handleDelete: (id: string) => void;
};

const TodoView = ({ item, setTodo, setIsEdit, setTempId, handleDelete }: TodoViewProps) => {
  const handleUpdate = (todo: Todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempId(todo.id);
  };

  return (
    <li className={styles.todo}>
      <h3 className={styles.todoName}>{item.todo}</h3>
      <Button
        styling={styles.updateButton}
        handleOnClick={() => handleUpdate(item)}
        title="Edit the item"
        icon={<HiMiniPencilSquare size={buttonSmall} />}
        text=""
      />
      <Button
        styling={styles.deleteButton}
        handleOnClick={() => handleDelete(item.id)}
        title="Delete the item"
        icon={<HiMiniXCircle size={buttonSmall} />}
        text=""
      />
    </li>
  );
};

export default TodoView;
