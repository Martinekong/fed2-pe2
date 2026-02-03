import Input from '../ui/Input';
import Button from '../ui/Button';

type Props = {
  open: boolean;
  isSaving?: boolean;
  url: string;
  alt: string;
  onChangeUrl: (v: string) => void;
  onChangeAlt: (v: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function AvatarModal({
  open,
  isSaving = false,
  url,
  alt,
  onChangeUrl,
  onChangeAlt,
  onClose,
  onSave,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <h2>Profile image</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-xl"
            aria-label="Close"
          >
            x
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <Input
            label="Image URL"
            value={url}
            onChange={(e) => onChangeUrl(e.target.value)}
            placeholder="https://image.unsplash.com/..."
          />
          <Input
            label="Description"
            value={alt}
            onChange={(e) => onChangeAlt(e.target.value)}
            placeholder="Describe your image"
          />

          <div className="mt-4 flex flex-wrap gap-4">
            <Button
              variant="primary"
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="w-full"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button>

            <Button
              variant="secondary"
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
