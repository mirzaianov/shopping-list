import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '../lib/auth';
import { listShoppingItems } from '../db/queries';
import ShoppingListPageClient from './shopping-list-page-client';

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

  return <ShoppingListPageClient initialTodos={todos} userEmail={session.user.email} />;
}
