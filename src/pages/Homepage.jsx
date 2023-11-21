import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '/firebase';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';
import {
  AiOutlinePlusCircle,
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlineCheck,
} from 'react-icons/ai';
import { VscSignOut } from 'react-icons/vsc';

const style = {
  container: `bg-slate-100 max-w-[300px] w-full h-full m-auto rounded-md shadow-xl p-4`,
  sign: `flex justify-between rounded-xl border-1 bg-white py-1 px-2.5`,
  accent: `text-blue-500 font-bold`,
  heading: `text-3xl font-bold text-center text-gray-800 p-5 uppercase`,
  form: `flex justify-between`,
  input: `border p-0.5 ps-5 w-full text-l rounded-xl`,
  addButton: `ml-2.5 text-green-500`,
  confirmButton: `ml-2.5 text-green-500`,
  updateButton: `ml-1 text-blue-500`,
  deleteButton: `ml-1 text-red-500`,
  signOutButton: `ml-1 text-red-500`,
  count: `text-center p-2`,
  todo: `flex justify-end bg-slate-200 p-1.5 pl-2.5 my-2 capitalize rounded-xl`,
  todoName: `mr-auto`,
  size: `text-blue-500 font-bold text-xl`,
};

const buttonSmall = 25;
const buttonBig = 40;

export default function Homepage() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState('');
  const [userEmail, setUserEmail] = useState('');

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

        const { email } = user;
        setUserEmail(email);
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
        <div className={style.sign}>
          <p>Signed as</p>
          <span className={style.accent}>{userEmail}</span>
          <button
            className={style.signOutButton}
            onClick={handleSignOut}
          >
            <VscSignOut size={buttonSmall} />
          </button>
        </div>
        <h1 className={style.heading}>Shopping List</h1>
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
              className={style.confirmButton}
              onClick={handleEditConfirm}
            >
              <AiOutlineCheck size={buttonBig} />
            </button>
          ) : (
            <button
              className={style.addButton}
              onClick={writeToDatabase}
            >
              <AiOutlinePlusCircle size={buttonBig} />
            </button>
          )}
        </form>
        <ul>
          {todos.map((item) => (
            <li
              className={style.todo}
              key={item.uidd}
            >
              <h3 className={style.todoName}>{item.todo}</h3>
              <button
                className={style.updateButton}
                onClick={() => handleUpdate(item)}
              >
                <AiOutlineEdit size={buttonSmall} />
              </button>
              <button
                className={style.deleteButton}
                onClick={() => handleDelete(item.uidd)}
              >
                <AiOutlineClose size={buttonSmall} />
              </button>
            </li>
          ))}
        </ul>
        <p className={style.count}>
          You have <span className={style.size}>{todos.length}</span> todos
        </p>
        {/* <Firestore todos={todos} /> */}
      </div>
    </>
  );
}
