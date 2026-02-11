import { useEffect, useState } from 'react';

import { type DateRange } from 'react-day-picker';
import { parseISO } from 'date-fns';
import Calendar from './Calendar';

import type { Booking } from '../../api/bookings';

import { nightsBetween } from '../../utils/date';

import Button from '../ui/Button';
import GuestButtons from './GuestButtons';
import BookingTotal from './BookingTotal';

type Props = {
  open: boolean;
  booking: Booking | null;
  isSaving?: boolean;
  onClose: () => void;
  onSave: (next: { dateFrom: string; dateTo: string; guests: number }) => void;
};

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
        <h2>Edit booking</h2>
        <button
          type="button"
          onClick={() => !isSaving && onClose()}
          className="absolute right-1 top-1 px-3 py-1 text-xl"
          aria-label="Close"
        >
          x
        </button>

        <Calendar
          range={range}
          onSelect={setRange}
          defaultMonth={range?.from ?? new Date()}
        />

        <div className="mt-6 flex flex-col gap-4">
          <BookingTotal nights={nights} totalPrice={totalPrice} />

          <GuestButtons
            value={guests}
            onChange={setGuests}
            max={booking?.venue?.maxGuests}
            disabled={isSaving}
          />
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
