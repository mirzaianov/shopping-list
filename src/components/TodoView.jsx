import PropTypes from 'prop-types';
import { HiMiniPencilSquare, HiMiniXCircle } from 'react-icons/hi2';
import { ref, remove } from 'firebase/database';
import { auth, db } from '../../firebase';
import Button from './Button';

const style = {
  todo: `flex py-2 gap-x-2 border-solid border-b border-neutral`,
  todoName: `mr-auto self-center text-left line-clamp-3 break-words`,
  updateButton: ``,
  deleteButton: ``,
};

const buttonSmall = 24;

const TodoView = ({ item, setTodo, setIsEdit, setTempUidd }) => {
  // update in firebase
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  // delete from firebase
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
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

TodoView.propTypes = {
  item: PropTypes.object.isRequired,
  setTodo: PropTypes.func.isRequired,
  setIsEdit: PropTypes.func.isRequired,
  setTempUidd: PropTypes.func.isRequired,
};

export default TodoView;
