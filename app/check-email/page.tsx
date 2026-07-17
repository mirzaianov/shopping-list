import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import CheckEmail from '../../src/features/check-email/check-email';
import { auth } from '../../src/lib/auth';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/');
  }

  return <CheckEmail />;
}
