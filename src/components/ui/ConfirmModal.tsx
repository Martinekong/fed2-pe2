import ModalWrapper from './ModalWrapper';
import Button from './Button';

type Props = {
  open: boolean;
  title: string;
  confirmText?: string;
  cancelText?: string;
  isConfirming?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmModal({
  open,
  title,
  confirmText = 'Yes, delete',
  cancelText = 'Cancel',
  isConfirming = false,
  onConfirm,
  onClose,
}: Props) {
  return (
    <ModalWrapper
      open={open}
      title={`Delete ${title}?`}
      onClose={onClose}
      maxWidthClassName="max-w-lg"
    >
      <p>
        Are you sure you want to delete this {title}? This action cannot be
        undone.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="tertiary"
          type="button"
          onClick={onConfirm}
          disabled={isConfirming}
        >
          {isConfirming ? 'Deleting...' : confirmText}
        </Button>

        <Button
          variant="secondary"
          type="button"
          onClick={onClose}
          disabled={isConfirming}
        >
          {cancelText}
        </Button>
      </div>
    </ModalWrapper>
  );
}
