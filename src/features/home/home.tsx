import { HiMiniUserCircle } from 'react-icons/hi2';
import type { Todo } from '../../types';
import ShoppingItemForm from './shopping-item-form';
import ShoppingList from './shopping-list';
import SignOutButton from './sign-out-button';
import styles from './home.module.css';

const buttonSmall = 24;

type HomeProps = {
  initialTodos: Todo[];
  userEmail: string;
};

export default function Home({ initialTodos, userEmail }: HomeProps) {
  return (
    <div className={styles.container}>
      <div className={styles.sign}>
        <span className={styles.signInLogo} title="You are signed in">
          <HiMiniUserCircle size={buttonSmall} />
        </span>
        <span className={styles.email} title="Your email">
          {userEmail}
        </span>
        <SignOutButton />
      </div>
      <h1 className={styles.heading}>Shopping List</h1>
      <ShoppingItemForm />
      <ShoppingList todos={initialTodos} />
    </div>
  );
}
