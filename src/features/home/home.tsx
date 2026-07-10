import Link from 'next/link';
import { Settings as SettingsIcon, UserCheck } from 'lucide-react';
import type { Todo } from '../../types';
import ShoppingItemEditDialog from './shopping-item-edit-dialog';
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
          <UserCheck size={buttonSmall} />
        </span>
        <span className={styles.email} title="Your email">
          {userEmail}
        </span>
        <Link className={styles.settingsButton} href="/settings" title="Settings">
          <SettingsIcon size={buttonSmall} />
        </Link>
        <SignOutButton />
      </div>
      <h1 className={styles.heading}>Atemoya</h1>
      <ShoppingItemForm />
      <ShoppingList todos={initialTodos} />
      <ShoppingItemEditDialog />
    </div>
  );
}
