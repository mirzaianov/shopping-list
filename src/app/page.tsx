'use client';

import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { uid } from 'uid';
import { set, ref, onValue, update } from 'firebase/database';
import { HiMiniUserCircle, HiMiniArrowRightCircle } from 'react-icons/hi2';
import InputAddView from '../components/input-add-view';
import InputEditView from '../components/input-edit-view';
import TodoListView from '../components/todo-list-view';
import type { Todo } from '../types';
import styles from './page.module.css';

const buttonSmall = 24;

export default function Page() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    let unsubscribeTodos: (() => void) | undefined;
    let unsubscribeAuth: (() => void) | undefined;

    void import('../../firebase').then(({ auth, db }) => {
      if (!isMounted) {
        return;
      }

      unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        unsubscribeTodos?.();
        unsubscribeTodos = undefined;

        if (!user) {
          router.replace('/login');
          return;
        }

        unsubscribeTodos = onValue(ref(db, `/${user.uid}`), (snapshot) => {
          const data = snapshot.val() as Record<string, Todo> | null;
          const nextTodos = data
            ? Object.values(data).sort((a, b) => b.changedOn - a.changedOn)
            : [];

          setTodos(nextTodos);
        });

        setUserEmail(user.email ?? '');
      });
    });

    return () => {
      isMounted = false;
      unsubscribeTodos?.();
      unsubscribeAuth?.();
    };
  }, [router]);

  const handleSignOut = async () => {
    const { auth } = await import('../../firebase');

    signOut(auth)
      .then(() => {
        router.push('/login');
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

  const writeToDatabase = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (todo.length === 0 || todo.trim().length === 0) {
      setTodo('');
      alert('Please enter a todo');
      return;
    }

    if (todos.find((item) => item.todo.toLowerCase().trim() === todo.toLowerCase().trim())) {
      alert('Todo already exists');
      return;
    }

    const { auth, db } = await import('../../firebase');
    const userId = auth.currentUser?.uid;
    if (!userId) {
      return;
    }

    const uidd = uid();

    set(ref(db, `/${userId}/${uidd}`), { todo, uidd, changedOn: Date.now() });
    setTodo('');
  };

  const handleEditConfirm = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (todo.length === 0 || todo.trim().length === 0) {
      setTodo('');
      alert('Please enter a todo');
      return;
    }

    const { auth, db } = await import('../../firebase');
    const userId = auth.currentUser?.uid;
    if (!userId) {
      return;
    }

    update(ref(db, `/${userId}/${tempUidd}`), {
      todo,
      uidd: tempUidd,
      changedOn: Date.now(),
    });
    setTodo('');
    setIsEdit(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sign}>
        <button className={styles.signInLogo} title="You are signed in">
          <HiMiniUserCircle size={buttonSmall} />
        </button>
        <span className={styles.email} title="Your email">
          {userEmail}
        </span>
        <button className={styles.signOutButton} onClick={handleSignOut} title="Sign Out">
          <HiMiniArrowRightCircle size={buttonSmall} />
        </button>
      </div>
      <h1 className={styles.heading}>Shopping List</h1>
      <form className={styles.form}>
        {isEdit ? (
          <InputEditView
            todo={todo}
            handleInputChange={handleInputChange}
            handleInputBlur={handleInputBlur}
            handleKeyDown={handleKeyDown}
            handleEditConfirm={handleEditConfirm}
          />
        ) : (
          <InputAddView
            todo={todo}
            handleInputChange={handleInputChange}
            handleInputBlur={handleInputBlur}
            handleKeyDown={handleKeyDown}
            writeToDatabase={writeToDatabase}
          />
        )}
      </form>
      <TodoListView
        todos={todos}
        setTodo={setTodo}
        setIsEdit={setIsEdit}
        setTempUidd={setTempUidd}
      />
    </div>
  );
}
