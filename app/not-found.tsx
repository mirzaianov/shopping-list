import Link from 'next/link';
import type { Metadata } from 'next';
import { House } from 'lucide-react';
import clsx from 'clsx';
import BrandHeader from '../src/components/brand-header';
import buttonStyles from '../src/components/button.module.css';
import styles from './not-found.module.css';

const buttonSmall = 20;

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <main className={styles.container}>
      <BrandHeader />
      <h2 className={styles.heading}>404</h2>
      <p className={styles.subHeading}>Page Not Found</p>
      <p className={styles.message}>This page does not exist.</p>
      <Link
        className={clsx(
          buttonStyles.button,
          buttonStyles.standard,
          buttonStyles.primary,
          styles.homeButton,
        )}
        href="/"
      >
        <span className={buttonStyles.buttonTop}>
          <House size={buttonSmall} />
          Go Home
        </span>
      </Link>
    </main>
  );
}
