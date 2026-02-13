import Input from '../ui/Input';
import Button from '../ui/Button';
import ModalWrapper from '../ui/ModalWrapper';

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
    <ModalWrapper
      open={open}
      title="Edit Profile Image"
      onClose={onClose}
      maxWidthClassName="max-w-lg"
    >
      <div className="mt-6 flex flex-col gap-4">
        <Input
          label="Image URL"
          value={url}
          onChange={(e) => onChangeUrl(e.target.value)}
          placeholder="https://image.unsplash.com/..."
          disabled={isSaving}
        />
        {!url.trim() && (
          <p className="text-sm text-error">Image URL is required</p>
        )}
        <Input
          label="Description"
          value={alt}
          onChange={(e) => onChangeAlt(e.target.value)}
          placeholder="Describe your image"
          disabled={isSaving}
        />

        <div className="mt-4 flex flex-wrap gap-4">
          <Button
            variant="primary"
            type="button"
            onClick={onSave}
            disabled={isSaving || !url.trim()}
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
    </ModalWrapper>
  );
}
