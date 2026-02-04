import { useEffect, useState } from 'react';
import { DayPicker, type DateRange } from 'react-day-picker';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import Button from '../ui/Button';
import type { Booking } from '../../api/bookings';

type Props = {
  open: boolean;
  booking: Booking | null;
  isSaving?: boolean;
  onClose: () => void;
  onSave: (next: { dateFrom: string; dateTo: string; guests: number }) => void;
};

function nightsBetween(from?: Date, to?: Date) {
  if (!from || !to) return 0;
  return Math.max(0, differenceInCalendarDays(to, from));
}

export default function CalendarModal({
  open,
  booking,
  isSaving = false,
  onClose,
  onSave,
}: Props) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    if (!open || !booking) return;

    setRange({
      from: parseISO(booking.dateFrom),
      to: parseISO(booking.dateTo),
    });
    setGuests(booking.guests);
  }, [open, booking]);

  if (!open) return;

  const price = booking?.venue?.price ?? 0;
  const nights = nightsBetween(range?.from, range?.to);
  const totalPrice = nights * price;

  const canSave =
    Boolean(range?.from && range?.to) && nights > 0 && guests >= 1 && !isSaving;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="relative flex max-w-[314px] flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg sm:max-w-[398px]">
        <div className="flex items-start justify-between">
          <h2>Edit booking</h2>
          <button
            type="button"
            onClick={() => !isSaving && onClose()}
            className="rounded-lg px-3 py-1 text-xl"
            aria-label="Close"
          >
            x
          </button>
        </div>

        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          defaultMonth={range?.from ?? new Date()}
          weekStartsOn={1}
          disabled={[{ before: new Date() }]}
          classNames={{
            root: 'text-secondary relative',
            day_button: 'h-9 w-9 sm:h-12 sm:w-12',
            caption_label: 'font-heading font-normal text-secondary pb-8',
            weekday: 'font-normal uppercase',
            disabled: 'opacity-50',
          }}
          modifiersClassNames={{
            selected: 'bg-primary text-secondary',
            range_start: 'rounded-tl-2xl rounded-bl-2xl !text-white',
            range_end: 'rounded-tr-2xl rounded-br-2xl text-white',
            range_middle: 'bg-primary/30',
          }}
        />

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p>Total {nights} nights:</p>
            <p className="font-semibold tracking-wide">$ {totalPrice}</p>
          </div>

          <div className="flex items-center justify-between">
            <p>Guests:</p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white disabled:opacity-50"
                disabled={guests <= 1 || isSaving}
                aria-label="Decrease guests"
              >
                -
              </button>

              <p className="w-6 text-center font-semibold">{guests}</p>

              <button
                type="button"
                onClick={() => setGuests((g) => g + 1)}
                className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white disabled:opacity-50"
                disabled={isSaving}
                // Add disabled to maxGuests of the venue
                aria-label="Increase guests"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="primary"
            type="button"
            disabled={!canSave}
            onClick={() => {
              if (!range?.from || !range?.to) return;
              onSave({
                dateFrom: range.from.toISOString(),
                dateTo: range.to.toISOString(),
                guests,
              });
            }}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
          <Button
            variant="secondary"
            type="button"
            disabled={isSaving}
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
