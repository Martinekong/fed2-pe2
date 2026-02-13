type Props = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidthClassName?: string;
};

export default function ModalWrapper({
  open,
  title,
  onClose,
  children,
  maxWidthClassName,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
      onClick={onClose}
      aria-modal="true"
    >
      <div
        className={`relative w-full ${maxWidthClassName} flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-lg`}
      >
        {title && <h2>{title}</h2>}

        <button
          type="button"
          onClick={onClose}
          className="absolute right-1 top-1 px-3 py-1 text-xl"
          aria-label="Close"
        >
          x
        </button>

        {children}
      </div>
    </div>
  );
}
