'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@base-ui/react/dialog';
import { Trash2, X } from 'lucide-react';
import clsx from 'clsx';
import { toast } from 'sonner';
import Button from '../../components/button';
import buttonStyles from '../../components/button.module.css';
import { deleteShoppingItemAction } from './shopping-list-actions';
import dialogStyles from './shopping-item-edit-dialog.module.css';
import styles from './todo-delete-dialog.module.css';

const buttonSmall = 20;

type TodoDeleteDialogProps = {
  id: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

export default function TodoDeleteDialog({ id, onOpenChange, open }: TodoDeleteDialogProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isDeleting) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deleteShoppingItemAction(id);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.error('Item deleted');
      onOpenChange(false);
      router.refresh();
    } catch {
      toast.error('Item could not be deleted. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={dialogStyles.backdrop} />
        <Dialog.Viewport className={dialogStyles.viewport}>
          <Dialog.Popup className={dialogStyles.popup}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <Dialog.Title className={dialogStyles.label}>Delete Item</Dialog.Title>
              <Dialog.Description className={styles.message}>
                This item will be removed from your list.
              </Dialog.Description>
              <div className={styles.actions}>
                <Dialog.Close
                  className={clsx(
                    buttonStyles.button,
                    buttonStyles.action,
                    buttonStyles.actionFull,
                    buttonStyles.neutral,
                  )}
                  type="button"
                >
                  <span className={buttonStyles.buttonTop}>
                    <X size={buttonSmall} />
                    Cancel
                  </span>
                </Dialog.Close>
                <Button
                  disabled={isDeleting}
                  icon={<Trash2 size={buttonSmall} />}
                  styling={clsx(
                    buttonStyles.action,
                    buttonStyles.actionFull,
                    buttonStyles.destructive,
                  )}
                  text="Confirm"
                  title="Confirm item deletion"
                  type="submit"
                />
              </div>
            </form>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
