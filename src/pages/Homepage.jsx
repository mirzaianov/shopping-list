import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';
import {
  LuPenSquare,
  LuCheckCircle,
  LuTrash2,
  LuLogOut,
  LuSmile,
  LuPlusCircle,
} from 'react-icons/lu';
import { auth, db } from '../../firebase';

const style = {
  container: `bg-base-200 max-w-[500px] text-center w-full m-auto rounded-lg shadow-xl p-5 text-lg`,
  sign: `font-mono flex justify-between shadow-md rounded-lg border-1 bg-base-100 py-1.5 px-2.5`,
  email: `text-[oklch(var(--p))] font-bold cursor-default self-center text-base`,
  heading: `text-2xl font-bold text-center text-gray-800 p-5 uppercase`,
  form: `flex justify-between mb-3`,
  input: `input w-full shadow-md placeholder:text-lg text-lg`,
  addButton: `ml-5 text-green-500`,
  confirmButton: `ml-5 text-green-500`,
  signOutButton: `text-red-500`,
  signInLogo: `text-green-500 cursor-default`,
  todo: `flex bg-base-100 shadow-md p-2 pl-3 gap-x-3 my-2 rounded-lg`,
  todoName: `mr-auto self-center text-left first-letter:uppercase`,
  updateButton: `ml-1 text-[oklch(var(--p))]`,
  deleteButton: `text-red-500`,
  count: `text-center mt-5`,
  size: `text-[oklch(var(--p))] font-bold text-xl`,
};

const buttonSmall = 30;
const buttonBig = 40;

export default function Homepage() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();

  const addRef = useRef();
  const editRef = useRef();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read form firebase
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

  useEffect(() => {
    isEdit ? editRef.current.focus() : addRef.current.focus();
  }, [isEdit]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  // add to fiewbase
  const writeToDatabase = (e) => {
    e.preventDefault();

    const uidd = uid();

    const todoSet = new Set([...todo.split('')]);

    if (todoSet.size === 0) {
      return alert('Please enter a todo');
    }

    if (todoSet.size === 1 && todoSet.has(' ')) {
      setTodo('');
      return alert('Please enter a todo');
    }

    if (todos.find((item) => item.todo.toLowerCase() === todo.toLowerCase())) {
      return alert('Todo already exists');
    }

    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), { todo, uidd });
    setTodo('');
  };

  // update in firebase
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

  // delete from firebase
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.sign}>
          <button
            className={style.signInLogo}
            title="You are signed in"
          >
            <LuSmile size={buttonSmall} />
          </button>
          <span
            className={style.email}
            title="Your email"
          >
            {userEmail}
          </span>
          <button
            className={style.signOutButton}
            onClick={handleSignOut}
            title="Sign Out"
          >
            <LuLogOut size={buttonSmall} />
          </button>
        </div>
        <h1 className={style.heading}>Shopping List</h1>
        <form className={style.form}>
          {isEdit ? (
            <>
              <input
                className={style.input}
                type="text"
                placeholder="Edit the item"
                value={todo}
                ref={editRef}
                onChange={handleInputChange}
              />
              <button
                className={style.confirmButton}
                onClick={handleEditConfirm}
                title="Confirm the changes"
              >
                <LuCheckCircle size={buttonBig} />
              </button>
            </>
          ) : (
            <>
              <input
                className={style.input}
                type="text"
                placeholder="Add a new item"
                value={todo}
                ref={addRef}
                onChange={handleInputChange}
              />
              <button
                className={style.addButton}
                onClick={writeToDatabase}
                title="Add an item to the list"
              >
                <LuPlusCircle size={buttonBig} />
              </button>
            </>
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
                <LuPenSquare size={buttonSmall} />
              </button>
              <button
                className={style.deleteButton}
                onClick={() => handleDelete(item.uidd)}
              >
                <LuTrash2 size={buttonSmall} />
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 ? null : (
          <p className={style.count}>
            You have <span className={style.size}>{todos.length}</span> item
            {todos.length > 1 ? 's' : ''}
          </p>
        )}

        {/* <Firestore todos={todos} /> */}
      </div>
    </>
  );
}
