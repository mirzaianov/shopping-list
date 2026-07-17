'use client';

import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AlertDialog } from '@base-ui/react/alert-dialog';
import { useMutation } from '@tanstack/react-query';
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
  const deleteItemMutation = useMutation({
    mutationFn: () => deleteShoppingItemAction(id),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await deleteItemMutation.mutateAsync();

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.error('Item deleted');
      onOpenChange(false);
      router.refresh();
    } catch {
      toast.error('Item could not be deleted. Please try again.');
    }
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <ModalLayout alert title="Delete Item">
        <DeleteModalLayout
          confirmDisabled={false}
          confirmPending={deleteItemMutation.isPending}
          onSubmit={handleSubmit}
        >
          <AlertDialog.Description className={styles.message}>
            This item will be removed from your list.
          </AlertDialog.Description>
        </DeleteModalLayout>
      </ModalLayout>
    </AlertDialog.Root>
  );
}
