type Props = {
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
};

export default function CardActions({ onEdit, onDelete, disabled }: Props) {
  return (
    <div className="flex flex-col justify-between">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onEdit();
        }}
        className="hover:underline"
        disabled={disabled}
      >
        Edit
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete();
        }}
        className="text-error hover:underline"
        disabled={disabled}
      >
        Delete
      </button>
    </div>
  );
}
