import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { listShoppingItems } from '../src/db/queries';
import Home from '../src/features/home/home';
import { auth } from '../src/lib/auth';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  const items = await listShoppingItems(session.user.id);
  const todos = items.map((item) => ({
    changedOn: item.changedOn,
    id: item.id,
    position: item.position,
    todo: item.todo,
  }));

  return (
    <Home initialTodos={todos} userEmail={session.user.email} userNickname={session.user.name} />
  );
}
