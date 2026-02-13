import { useEffect, useState } from 'react';

import { type DateRange } from 'react-day-picker';
import { parseISO } from 'date-fns';
import Calendar from './Calendar';

import type { Booking } from '../../api/bookings';

import { nightsBetween } from '../../utils/date';

import Button from '../ui/Button';
import GuestButtons from './GuestButtons';
import BookingTotal from './BookingTotal';
import ModalWrapper from '../ui/ModalWrapper';

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

  if (!open) return null;

  const price = booking?.venue?.price ?? 0;
  const nights = nightsBetween(range?.from, range?.to);
  const totalPrice = nights * price;

  const canSave =
    Boolean(range?.from && range?.to) && nights > 0 && guests >= 1 && !isSaving;

  return (
    <ModalWrapper
      open={open}
      title="Edit Booking"
      onClose={onClose}
      maxWidthClassName="max-w-[314px] sm:max-w-[398px]"
    >
      <Calendar
        key={range?.from?.toISOString() ?? 'empty'}
        range={range}
        onSelect={setRange}
        defaultMonth={range?.from ?? new Date()}
        size="modal"
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
    </ModalWrapper>
  );
}
