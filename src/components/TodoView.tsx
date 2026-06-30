import type { Dispatch, SetStateAction } from 'react';
import { HiMiniPencilSquare, HiMiniXCircle } from 'react-icons/hi2';
import { ref, remove } from 'firebase/database';
import { auth, db } from '../../firebase';
import Button from './Button';
import type { Todo } from '../types';

const style = {
  todo: `flex py-2 gap-x-2 border-solid border-b border-neutral`,
  todoName: `mr-auto self-center text-left line-clamp-3 break-words`,
  updateButton: ``,
  deleteButton: ``,
};

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
    <li className={style.todo}>
      <h3 className={style.todoName}>{item.todo}</h3>
      <Button
        styling={style.updateButton}
        handleOnClick={() => handleUpdate(item)}
        title="Edit the item"
        icon={<HiMiniPencilSquare size={buttonSmall} />}
        text=""
      />
      <Button
        styling={style.deleteButton}
        handleOnClick={() => handleDelete(item.uidd)}
        title="Delete the item"
        icon={<HiMiniXCircle size={buttonSmall} />}
        text=""
      />
    </li>
  );
};

export default TodoView;
