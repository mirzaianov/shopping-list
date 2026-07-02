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
import { HiMiniUserCircle, HiMiniArrowRightCircle } from 'react-icons/hi2';
import InputAddView from '../components/input-add-view';
import InputEditView from '../components/input-edit-view';
import TodoListView from '../components/todo-list-view';
import { authClient } from '../lib/auth-client';
import type { Todo } from '../types';
import {
  createShoppingItemAction,
  deleteShoppingItemAction,
  updateShoppingItemAction,
} from './shopping-list-actions';
import styles from './page.module.css';

const buttonSmall = 24;

type ShoppingListPageClientProps = {
  initialTodos: Todo[];
  userEmail: string;
};

export default function ShoppingListPageClient({
  initialTodos,
  userEmail,
}: ShoppingListPageClientProps) {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState(initialTodos);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState('');
  const router = useRouter();

  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/login');
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

    const result = await createShoppingItemAction(todo);
    if (result.error) {
      alert(result.error);
      return;
    }

    setTodo('');
    router.refresh();
  };

  const handleEditConfirm = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const result = await updateShoppingItemAction(tempUidd, todo);
    if (result.error) {
      alert(result.error);
      return;
    }

    setTodo('');
    setIsEdit(false);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    const result = await deleteShoppingItemAction(id);
    if (result.error) {
      alert(result.error);
      return;
    }

    router.refresh();
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
        handleDelete={handleDelete}
      />
    </div>
  );
}
