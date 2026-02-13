import { DayPicker } from 'react-day-picker';
import type { DateRange, Matcher } from 'react-day-picker';

type CalendarSize = 'card' | 'modal';

type Props = {
  range: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
  defaultMonth?: Date;
  disabled?: Matcher | Matcher[];
  size?: CalendarSize;
};

export default function Calendar({
  range,
  onSelect,
  defaultMonth,
  disabled = [],
  size,
}: Props) {
  const today = new Date();

  const disabledMatchers: Matcher[] = [
    { before: today },
    ...(Array.isArray(disabled) ? disabled : [disabled]),
  ];

  const dayButtonSize =
    size === 'card'
      ? 'h-9 w-9 sm:h-12 sm:w-12 md:h-9 md:w-9 lg:h-12 lg:w-12'
      : 'h-9 w-9 sm:h-12 sm:w-12';

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
        day_button: `${dayButtonSize} rounded-full hover:bg-primary/10 transition disabled:hover:bg-transparent`,
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
