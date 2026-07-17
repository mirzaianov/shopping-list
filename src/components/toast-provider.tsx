'use client';

import { CircleCheck, CircleX, Info } from 'lucide-react';
import { Toast } from '@base-ui/react/toast';
import styles from './toast-provider.module.css';

const duration = 2000;
const iconSize = 18;

type ToastType = 'success' | 'info' | 'error';

const toastManager = Toast.createToastManager();
const toastIcons = {
  success: CircleCheck,
  info: Info,
  error: CircleX,
};

function addToast(type: ToastType, description: string) {
  toastManager.add({ description, type });
}

export const toast = {
  success: (description: string) => addToast('success', description),
  info: (description: string) => addToast('info', description),
  error: (description: string) => addToast('error', description),
};

function ToastList() {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toastItem) => {
    const Icon = toastIcons[toastItem.type as ToastType] ?? Info;

    return (
      <Toast.Root className={styles.toast} key={toastItem.id} toast={toastItem}>
        <Toast.Content className={styles.content}>
          <Icon aria-hidden="true" className={styles.icon} size={iconSize} />
          <Toast.Description className={styles.description} />
        </Toast.Content>
        <span aria-hidden="true" className={styles.progress} />
      </Toast.Root>
    );
  });
}

export default function ToastProvider() {
  return (
    <Toast.Provider limit={1} timeout={duration} toastManager={toastManager}>
      <Toast.Portal>
        <Toast.Viewport className={styles.viewport}>
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}
