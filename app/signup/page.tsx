import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '../../src/lib/auth';
import Signup from '../../src/features/signup/signup';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/');
  }

  return <Signup />;
}
