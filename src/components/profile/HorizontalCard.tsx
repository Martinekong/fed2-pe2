import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import SafeImage from '../ui/SafeImage';

type Props = {
  to: string;
  imageSrc?: string;
  imageAlt: string;
  children: ReactNode;
};

export default function HorizontalCard({
  to,
  imageSrc,
  imageAlt,
  children,
}: Props) {
  return (
    <Link
      to={to}
      className="flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-lg transition hover:shadow-xl sm:max-h-40 sm:flex-row"
    >
      <SafeImage
        src={imageSrc}
        alt={imageAlt}
        className="h-40 w-full object-cover sm:h-auto sm:min-h-40 sm:w-56 sm:shrink-0"
      />

      <div className="flex w-full justify-between gap-4 p-4">{children}</div>
    </Link>
  );
}
