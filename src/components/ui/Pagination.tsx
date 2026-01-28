import Button from './Button';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getPages(page: number, totalPages: number) {
  const pages: (number | 'dots')[] = [];

  const clamp = (n: number) => Math.max(1, Math.min(totalPages, n));
  const p = clamp(page);

  const showLeft = Math.max(1, p - 1);
  const showRight = Math.min(totalPages, p + 1);

  pages.push(1);

  if (showLeft > 2) pages.push('dots');

  for (let i = showLeft; i <= showRight; i++) {
    if (i !== 1 && i !== totalPages) pages.push(i);
  }

  if (showRight < totalPages - 1) pages.push('dots');

  if (totalPages > 1) pages.push(totalPages);

  return pages.filter((v, i, arr) => arr.indexOf(v) === i);
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const items = getPages(page, totalPages);

  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
      <Button
        variant="secondary"
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="w-24"
      >
        Previous
      </Button>

      <div className="flex items-center gap-5">
        {items.map((item, index) =>
          item === 'dots' ? (
            <span key={`e-${index}`}>...</span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              className={`p-1 transition ${item === page ? 'border-b-2 border-secondary font-semibold' : 'pt-[2px] opacity-80 hover:opacity-100'}`}
              aria-current={item === page ? 'page' : undefined}
            >
              {item}
            </button>
          ),
        )}
      </div>

      <Button
        variant="secondary"
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="w-24"
      >
        Next
      </Button>
    </div>
  );
}
