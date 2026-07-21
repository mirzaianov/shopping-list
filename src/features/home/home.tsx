import BrandHeader from '../../components/brand-header';
import type { Task } from '../../types';
import AccountMenu from './account-menu';
import TaskForm from './task-form';
import TaskList from './task-list';

import styles from './home.module.css';

interface HomeProps {
  initialTasks: Task[];
  userEmail: string;
  userNickname: string;
}

export default function Home({ initialTasks, userEmail, userNickname }: HomeProps) {
  return (
    <div className={styles.container}>
      <BrandHeader action={<AccountMenu email={userEmail} nickname={userNickname} />} />
      <TaskForm />
      <TaskList tasks={initialTasks} />
    </div>
  );
}
