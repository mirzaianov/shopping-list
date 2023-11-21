import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '/firebase';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { AiOutlinePlus } from 'react-icons/ai';

const style = {
  form: `w-500px flex flex-col space-y-2`,
  wrapper: `flex space-x-2`,
  todo: `flex space-x-2`,
};

export default function Homepage() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);

          const data = snapshot.val();

          if (data !== null) {
            Object.values(data).map((item) => {
              setTodos((oldArray) => [...oldArray, item]);
            });
          }
        });
      }
      if (!user) {
        navigate('/');
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // add
  const writeToDatabase = (e) => {
    e.preventDefault();
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), { todo, uidd });
    setTodo('');
  };

  // update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  const handleEditConfirm = (e) => {
    e.preventDefault();
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), { todo, tempUidd });
    setTodo('');
    setIsEdit(false);
  };

  // delete

  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  return (
    <>
      <form className={style.form}>
        <div className={style.wrapper}>
          <input
            className={style.input}
            type="text"
            placeholder="Add Todo..."
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          {isEdit ? (
            <button
              className={style.button}
              onClick={handleEditConfirm}
            >
              Confirm
            </button>
          ) : (
            <button
              className={style.button}
              onClick={writeToDatabase}
            >
              <AiOutlinePlus size={30} />
            </button>
          )}
          <button
            className={style.button}
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </form>
      <ul>
        {todos.map((item) => (
          <li
            className={style.todo}
            key={item.uidd}
          >
            <h1>{item.todo}</h1>
            <button
              className={style.button}
              onClick={() => handleUpdate(item)}
            >
              update
            </button>
            <button
              className={style.button}
              onClick={() => handleDelete(item.uidd)}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
