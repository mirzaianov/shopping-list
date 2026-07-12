import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '../lib/auth';
import { listShoppingItems } from '../db/queries';
import Home from '../features/home/home';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  const items = await listShoppingItems(session.user.id);
  const todos = items.map((item) => ({
    todo: item.todo,
    id: item.id,
    changedOn: item.changedOn,
    position: item.position,
  }));

  return (
    <Home initialTodos={todos} userEmail={session.user.email} userNickname={session.user.name} />
  );
}
