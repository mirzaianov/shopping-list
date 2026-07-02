import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '../lib/auth';
import { listShoppingItems } from '../db/queries';
import HomeClient from '../features/home/home-client';

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
  }));

  return <HomeClient initialTodos={todos} userEmail={session.user.email} />;
}
