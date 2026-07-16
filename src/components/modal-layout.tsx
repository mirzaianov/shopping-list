'use client';

import type { ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { X } from 'lucide-react';
import clsx from 'clsx';
import buttonStyles from './button.module.css';
import styles from './modal-layout.module.css';

type ModalLayoutProps = {
  children: ReactNode;
  title: string;
  titleId?: string;
};

export default function ModalLayout({ children, title, titleId }: ModalLayoutProps) {
  const closeLabel = `Close ${title} dialog`;

  return (
    <Dialog.Portal>
      <Dialog.Backdrop className={styles.backdrop} />
      <Dialog.Viewport className={styles.viewport}>
        <Dialog.Popup className={styles.popup}>
          <Dialog.Close
            aria-label={closeLabel}
            className={clsx(buttonStyles.button, styles.closeButton)}
            title={closeLabel}
            type="button"
          >
            <X size={24} />
          </Dialog.Close>
          <Dialog.Title className={styles.title} id={titleId}>
            {title}
          </Dialog.Title>
          {children}
        </Dialog.Popup>
      </Dialog.Viewport>
    </Dialog.Portal>
  );
}
