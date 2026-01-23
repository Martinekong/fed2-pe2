import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
};

const base =
  'flex items-center justify-center rounded-2xl px-4 py-2 shadow-md hover:shadow-lg transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary: 'bg-primary hover:bg-primary_hover text-white',
  secondary: 'border border-secondary text-secondary',
};

export default function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: Props) {
  const width = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${base} ${variants[variant]} ${width} ${className}`}
      {...props}
    />
  );
}

//  .primary-btn
//     min-h-[34px] min-w-20 p-1

// .secondary-btn
//     w-20 p-1
