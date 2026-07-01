import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import styles from '../app.module.css';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Shopping List',
  description: 'A simple-to-use application to support you in organizing your shopping list',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className={styles.page}>{children}</div>
      </body>
    </html>
  );
}
