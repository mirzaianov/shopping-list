import Link from 'next/link';
import type { Metadata } from 'next';
import { House } from 'lucide-react';
import buttonStyles from '../components/button.module.css';
import styles from './not-found.module.css';

const buttonSmall = 20;

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>404</h1>
      <p className={styles.subHeading}>Page Not Found</p>
      <p className={styles.message}>This page does not exist.</p>
      <Link className={`${buttonStyles.button} ${buttonStyles.homeLink}`} href="/">
        <House size={buttonSmall} />
        Go Home
      </Link>
    </main>
  );
}
