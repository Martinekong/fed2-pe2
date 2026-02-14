import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'hero';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
};

const base =
  'flex items-center justify-center rounded-full px-4 py-2 shadow-md hover:shadow-lg transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary: 'bg-primary border border-primary hover:bg-primary_hover text-white',
  secondary:
    'bg-secondary border border-secondary hover:bg-secondary_hover text-tertiary',
  tertiary:
    ' border border-error/40 bg-error/5 hover:bg-error/10 hover:border-error text-tertiary',
  hero: 'border border-white/60 hover:border-white bg-black/35 hover:bg-black/45 backdrop-blur-sm text-white',
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
      type={props.type ?? 'button'}
      className={`${base} ${variants[variant]} ${width} ${className}`}
      {...props}
    />
  );
}
