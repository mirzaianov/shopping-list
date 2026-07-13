import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import styles from './layout.module.css';
import 'sonner/dist/styles.css';
import '../src/globals.css';

const isProduction = process.env.NODE_ENV === 'production';

export const metadata: Metadata = {
  title: 'Atemoya',
  description: 'A simple-to-use application to support you in organizing your tasks',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className={styles.page}>{children}</div>
        <Toaster
          closeButton
          containerAriaLabel="Notifications"
          duration={4000}
          mobileOffset={16}
          offset={16}
          position="top-right"
          richColors
          toastOptions={{
            classNames: {
              error: styles.toastError,
              success: styles.toastSuccess,
              toast: styles.toast,
            },
          }}
          visibleToasts={1}
        />
        {isProduction ? <Analytics /> : null}
      </body>
    </html>
  );
}
