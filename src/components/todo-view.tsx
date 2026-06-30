import type { Dispatch, SetStateAction } from 'react';
import { HiMiniPencilSquare, HiMiniXCircle } from 'react-icons/hi2';
import { ref, remove } from 'firebase/database';
import Button from './button';
import { auth, db } from '../../firebase';
import type { Todo } from '../types';
import styles from './todo-view.module.css';

const buttonSmall = 24;

type TodoViewProps = {
  item: Todo;
  setTodo: Dispatch<SetStateAction<string>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setTempUidd: Dispatch<SetStateAction<string>>;
};

const TodoView = ({ item, setTodo, setIsEdit, setTempUidd }: TodoViewProps) => {
  // update in firebase
  const handleUpdate = (todo: Todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  // delete from firebase
  const handleDelete = (uid: string) => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      return;
    }

    remove(ref(db, `/${userId}/${uid}`));
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
        handleOnClick={() => handleDelete(item.uidd)}
        title="Delete the item"
        icon={<HiMiniXCircle size={buttonSmall} />}
        text=""
      />
    </li>
  );
};

export default TodoView;
