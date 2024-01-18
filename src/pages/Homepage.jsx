import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { uid } from 'uid';
import { set, ref, onValue, update } from 'firebase/database';
import {
  HiMiniUserCircle,
  HiMiniPlusCircle,
  HiMiniCheckCircle,
  HiMiniArrowRightCircle,
} from 'react-icons/hi2';
import { auth, db } from '../../firebase';
import TodoListView from '../components/TodoListView';

const style = {
  container: `bg-base-100 max-w-[358px] text-center w-full m-auto border-solid border border-neutral rounded-2xl p-5 text-lg text-base-content leading-6 shadow-[5px_5px_0px_-0px] shadow-neutral`,
  sign: `flex justify-between rounded-lg`,
  email: `cursor-default self-center text-base truncate mx-2`,
  heading: `truncate text-4xl text-primary text-center mt-3 mb-5 py-2 my-custom-heading-font bg-gradient-to-r from-secondary to-primary to-70% text-transparent bg-clip-text `,
  form: `flex justify-between mb-3`,
  input: `input w-full input-bordered border-neutral placeholder:text-xl text-xl focus:input-primary`,
  addButton: `ml-5 mr-1 text-primary `,
  confirmButton: `ml-5 mr-1 text-primary`,
  signOutButton: ``,
  signInLogo: `cursor-default text-primary`,
  todos: `[&>*:last-child]:border-0 [&>*:last-child]:pb-0`,
};

const buttonSmall = 24;
const buttonBig = 48;

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

  const handleInputBlur = () => {
    setTodo(todo.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setTodo(e.target.value.trim());
    }
  };

  // add to fiewbase
  const writeToDatabase = (e) => {
    e.preventDefault();

    // console.log(`#${todo}#`);

    if (todo.length === 0 || todo.trim().length === 0) {
      setTodo('');
      return alert('Please enter a todo');
    }

    if (
      todos.find(
        (item) => item.todo.toLowerCase().trim() === todo.toLowerCase().trim(),
      )
    ) {
      return alert('Todo already exists');
    }

    const uidd = uid();

    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), { todo, uidd });
    setTodo('');
  };

  const handleEditConfirm = (e) => {
    e.preventDefault();

    if (todo.length === 0 || todo.trim().length === 0) {
      setTodo('');
      return alert('Please enter a todo');
    }

    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), { todo, tempUidd });
    setTodo('');
    setIsEdit(false);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.sign}>
          <button
            className={style.signInLogo}
            title="You are signed in"
          >
            <HiMiniUserCircle size={buttonSmall} />
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
            <HiMiniArrowRightCircle size={buttonSmall} />
          </button>
        </div>
        <h1 className={style.heading}>
          Shopping List
          {/* {' • '} */}
          {/* {todos.length === 0 ? <span>0</span> : <span>{todos.length}</span>} */}
        </h1>
        <form className={style.form}>
          {isEdit ? (
            <>
              <input
                required
                className={style.input}
                type="text"
                placeholder="Edit the item"
                value={todo}
                ref={editRef}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
              />
              <button
                className={style.confirmButton}
                onClick={handleEditConfirm}
                title="Confirm the changes"
              >
                <HiMiniCheckCircle size={buttonBig} />
              </button>
            </>
          ) : (
            <>
              <input
                required
                className={style.input}
                type="text"
                placeholder="Add an item"
                value={todo}
                ref={addRef}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
              />
              <button
                className={style.addButton}
                onClick={writeToDatabase}
                title="Add an item to the list"
              >
                <HiMiniPlusCircle size={buttonBig} />
              </button>
            </>
          )}
        </form>
        <TodoListView
          todos={todos}
          setTodo={setTodo}
          setIsEdit={setIsEdit}
          setTempUidd={setTempUidd}
        />
      </div>
    </>
  );
}
