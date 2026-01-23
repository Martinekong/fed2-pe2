import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({
  label,
  error,
  className = '',
  ...props
}: Props) {
  const inputClases = `input-field ${error ? 'input-field-error' : ''} ${className}`;

  return (
    <label className="flex w-full flex-col">
      {label && <span>{label}</span>}

      <input className={inputClases} {...props} />

      {error && <p className="pl-4 pt-2 text-sm text-error">{error}</p>}
    </label>
  );
}
