import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { uid } from 'uid';
import { set, ref, onValue, update } from 'firebase/database';
import { HiMiniUserCircle, HiMiniArrowRightCircle } from 'react-icons/hi2';
import { auth, db } from '../../firebase';
import TodoListView from '../components/TodoListView';
import InputAddView from '../components/InputAddView';
import InputEditView from '../components/InputEditView';
import type { Todo } from '../types';

const style = {
  container: `bg-base-100 max-w-[358px] text-center w-full m-auto border-solid border border-neutral rounded-2xl p-5 text-lg text-base-content leading-6 shadow-[5px_5px_0px_-0px] shadow-neutral`,
  sign: `flex justify-between rounded-lg`,
  signInLogo: `cursor-default text-primary`,
  signOutButton: ``,
  email: `cursor-default self-center text-base truncate mx-2`,
  heading: `truncate text-4xl text-primary text-center mt-3 mb-5 py-2 my-custom-heading-font bg-gradient-to-r from-secondary to-primary to-70% text-transparent bg-clip-text `,
  form: `flex justify-between mb-3`,
  todos: `[&>*:last-child]:border-0 [&>*:last-child]:pb-0`,
};

const buttonSmall = 24;

export default function Homepage() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();
  const changedOn = new Date().getTime();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // read form firebase
        onValue(ref(db, `/${user.uid}`), (snapshot) => {
          const data = snapshot.val() as Record<string, Todo> | null;
          const nextTodos = data
            ? Object.values(data).sort((a, b) => b.changedOn - a.changedOn)
            : [];

          setTodos(nextTodos);
        });

        const { email } = user;
        setUserEmail(email ?? '');
      }

      if (!user) {
        navigate('/');
      }
    });
  }, [navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err.message);
        alert(`Something went wrong. Please try later.`);
      });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTodo(e.target.value.trim());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setTodo(e.currentTarget.value.trim());
    }
  };

  // add to fiewbase
  const writeToDatabase = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // console.log(`#${todo}#`);

    if (todo.length === 0 || todo.trim().length === 0) {
      setTodo('');
      alert('Please enter a todo');
      return;
    }

    if (todos.find((item) => item.todo.toLowerCase().trim() === todo.toLowerCase().trim())) {
      alert('Todo already exists');
      return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) {
      return;
    }

    const uidd = uid();

    set(ref(db, `/${userId}/${uidd}`), { todo, uidd, changedOn });
    setTodo('');
  };

  const handleEditConfirm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (todo.length === 0 || todo.trim().length === 0) {
      setTodo('');
      alert('Please enter a todo');
      return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) {
      return;
    }

    update(ref(db, `/${userId}/${tempUidd}`), {
      todo,
      uidd: tempUidd,
      changedOn,
    });
    setTodo('');
    setIsEdit(false);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.sign}>
          <button className={style.signInLogo} title="You are signed in">
            <HiMiniUserCircle size={buttonSmall} />
          </button>
          <span className={style.email} title="Your email">
            {userEmail}
          </span>
          <button className={style.signOutButton} onClick={handleSignOut} title="Sign Out">
            <HiMiniArrowRightCircle size={buttonSmall} />
          </button>
        </div>
        <h1 className={style.heading}>Shopping List</h1>
        <form className={style.form}>
          {isEdit ? (
            // todo: lazy-loading
            <InputEditView
              todo={todo}
              handleInputChange={handleInputChange}
              handleInputBlur={handleInputBlur}
              handleKeyDown={handleKeyDown}
              handleEditConfirm={handleEditConfirm}
            />
          ) : (
            // todo: lazy-loading
            <InputAddView
              todo={todo}
              handleInputChange={handleInputChange}
              handleInputBlur={handleInputBlur}
              handleKeyDown={handleKeyDown}
              writeToDatabase={writeToDatabase}
            />
          )}
        </form>
        {/* todo: lazy-loading */}
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
