'use client';

import { useRouter } from 'next/navigation';
import { HiMiniArrowRightCircle } from 'react-icons/hi2';
import { authClient } from '../../lib/auth-client';
import styles from './home.module.css';

const buttonSmall = 24;

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/login');
  };

  return (
    <button className={styles.signOutButton} onClick={handleSignOut} title="Sign Out">
      <HiMiniArrowRightCircle size={buttonSmall} />
    </button>
  );
}
