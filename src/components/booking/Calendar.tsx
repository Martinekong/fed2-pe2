import { DayPicker } from 'react-day-picker';
import type { DateRange, Matcher } from 'react-day-picker';

type Props = {
  range: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
  defaultMonth?: Date;
  disabled?: Matcher | Matcher[];
};

export default function Calendar({
  range,
  onSelect,
  defaultMonth,
  disabled = [],
}: Props) {
  const today = new Date();

  const disabledMatchers: Matcher[] = [
    { before: today },
    ...(Array.isArray(disabled) ? disabled : [disabled]),
  ];

  return (
    <DayPicker
      mode="range"
      selected={range}
      onSelect={onSelect}
      defaultMonth={defaultMonth ?? range?.from ?? new Date()}
      weekStartsOn={1}
      disabled={disabledMatchers}
      classNames={{
        root: 'text-secondary relative',
        day_button:
          'h-9 w-9 sm:h-12 sm:w-12 md:h-9 md:w-9 lg:h-12 lg:w-12 rounded-full hover:bg-primary/10 transition',
        day: 'text-sm',
        caption_label:
          'font-heading font-normal tracking-wider text-secondary pb-8',
        weekday: 'font-normal',
        disabled: 'opacity-50',
        today: 'font-semibold',
      }}
      modifiersClassNames={{
        selected: 'bg-primary text-secondary',
        range_start: 'rounded-full !text-white',
        range_end: 'rounded-full text-white',
        range_middle: 'bg-tertiary rounded-full',
      }}
    />
  );
}
