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
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="relative flex w-full max-w-lg flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg">
        <h2>Delete {title}?</h2>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-1 top-1 rounded-lg px-3 py-1 text-xl"
          aria-label="Close"
        >
          x
        </button>

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
            variant="primary"
            type="button"
            onClick={onClose}
            disabled={isConfirming}
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
}
