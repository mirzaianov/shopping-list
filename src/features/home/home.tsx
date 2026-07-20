import BrandHeader from '../../components/brand-header';
import type { Todo } from '../../types';
import AccountMenu from './account-menu';
import ShoppingItemForm from './shopping-item-form';
import ShoppingList from './shopping-list';

import styles from './home.module.css';

interface HomeProps {
  initialTodos: Todo[];
  userEmail: string;
  userNickname: string;
}

export default function Home({ initialTodos, userEmail, userNickname }: HomeProps) {
  return (
    <div className={styles.container}>
      <BrandHeader action={<AccountMenu email={userEmail} nickname={userNickname} />} />
      <ShoppingItemForm />
      <ShoppingList todos={initialTodos} />
    </div>
  );
}
