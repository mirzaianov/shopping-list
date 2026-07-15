'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@base-ui/react/dialog';
import { toast } from 'sonner';
import DeleteModalLayout from '../../components/delete-modal-layout';
import ModalLayout from '../../components/modal-layout';
import { deleteShoppingItemAction } from './shopping-list-actions';
import styles from './todo-delete-dialog.module.css';

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
      <ModalLayout title="Delete Item">
        <DeleteModalLayout confirmDisabled={isDeleting} onSubmit={handleSubmit}>
          <Dialog.Description className={styles.message}>
            This item will be removed from your list.
          </Dialog.Description>
        </DeleteModalLayout>
      </ModalLayout>
    </Dialog.Root>
  );
}
