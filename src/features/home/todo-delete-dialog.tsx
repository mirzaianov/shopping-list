'use client';

import { Dialog } from '@base-ui/react/dialog';
import { Trash2, X } from 'lucide-react';
import clsx from 'clsx';
import Button from '../../components/button';
import buttonStyles from '../../components/button.module.css';
import { deleteShoppingItemFormAction } from './shopping-list-actions';
import dialogStyles from './shopping-item-edit-dialog.module.css';
import styles from './todo-delete-dialog.module.css';

const buttonSmall = 20;

type TodoDeleteDialogProps = {
  id: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

export default function TodoDeleteDialog({ id, onOpenChange, open }: TodoDeleteDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={dialogStyles.backdrop} />
        <Dialog.Viewport className={dialogStyles.viewport}>
          <Dialog.Popup className={dialogStyles.popup}>
            <form
              action={deleteShoppingItemFormAction}
              className={styles.form}
              onSubmit={() => onOpenChange(false)}
            >
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
                    buttonStyles.outline,
                  )}
                  type="button"
                >
                  <X size={buttonSmall} />
                  Cancel
                </Dialog.Close>
                <input name="id" type="hidden" value={id} />
                <Button
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
