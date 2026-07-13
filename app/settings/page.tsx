import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '../../src/lib/auth';
import Settings from '../../src/features/settings/settings';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  return <Settings userEmail={session.user.email} userNickname={session.user.name} />;
}
