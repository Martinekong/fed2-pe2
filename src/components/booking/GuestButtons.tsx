type GuestButtonsProps = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
};

export default function GuestButtons({
  value,
  onChange,
  min = 1,
  max = Infinity,
  disabled = false,
}: GuestButtonsProps) {
  return (
    <div className="flex items-center justify-between">
      <p>Guests:</p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={disabled || value <= min}
          aria-label="Decrease guests"
          className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white disabled:opacity-50"
        >
          -
        </button>

        <p className="w-6 text-center font-semibold">{value}</p>

        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={disabled || value >= max}
          aria-label="Increase guests"
          className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white disabled:opacity-50"
        >
          -
        </button>
      </div>
    </div>
  );
}
