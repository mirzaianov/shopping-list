import Image from 'next/image';
import type { Todo } from '../../types';
import AccountMenu from './account-menu';
import ShoppingItemEditDialog from './shopping-item-edit-dialog';
import ShoppingItemForm from './shopping-item-form';
import ShoppingList from './shopping-list';
import styles from './home.module.css';

type HomeProps = {
  initialTodos: Todo[];
  userEmail: string;
  userNickname: string;
};

export default function Home({ initialTodos, userEmail, userNickname }: HomeProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          aria-hidden="true"
          className={styles.logo}
          src="/atemoya-icon.svg"
          alt=""
          width={32}
          height={32}
        />
        <h1 className={styles.heading}>
          <span className={styles.headingText}>atemoya</span>
        </h1>
        <AccountMenu email={userEmail} nickname={userNickname} />
      </div>
      <ShoppingItemForm />
      <ShoppingList todos={initialTodos} />
      <ShoppingItemEditDialog />
    </div>
  );
}
