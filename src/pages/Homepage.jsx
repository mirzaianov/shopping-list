import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '/firebase';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from '../components/Todo';

const style = {
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
  todo: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
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
      <div className={style.container}>
        <button
          className={style.button}
          onClick={handleSignOut}
        >
          Sign Out
        </button>
        <h3 className={style.heading}>Todo App</h3>
        <form className={style.form}>
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
        </form>
        <ul>
          {todos.map((item) => (
            <Todo
              key={item.uidd}
              todo={item.todo}
            />
          ))}
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
        <p className={style.count}>You have 2 todos</p>
      </div>
    </>
  );
}
