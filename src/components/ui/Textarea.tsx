import type { TextareaHTMLAttributes } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export default function Textarea({
  label,
  error,
  className = '',
  ...props
}: Props) {
  const textareaClasses = `input-field resize-none ${error ? 'input-field-error' : ''} ${className}`;

  return (
    <label className="flex w-full flex-col">
      {label && <span>{label}</span>}

      <textarea className={textareaClasses} {...props} />

      {error && <p className="pl-4 pt-2 text-sm text-error">{error}</p>}
    </label>
  );
}
