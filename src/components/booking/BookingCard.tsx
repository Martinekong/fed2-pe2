import { useState } from 'react';
import { DayPicker, type DateRange } from 'react-day-picker';
import { addDays, differenceInCalendarDays, parseISO } from 'date-fns';

import Button from '../ui/Button';
import type { Venue } from '../../api/venues';
import { request } from '../../api/client';
import toast from 'react-hot-toast';

type Props = { venue: Venue };

function nightsBetween(from?: Date, to?: Date) {
  if (!from || !to) return 0;
  return Math.max(0, differenceInCalendarDays(to, from));
}

export default function BookingCard({ venue }: Props) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bookedRanges = (venue.bookings ?? []).map((b) => ({
    from: parseISO(b.dateFrom),
    to: addDays(parseISO(b.dateTo), -1),
  }));

  const nights = nightsBetween(range?.from, range?.to);
  const totalPrice = nights * venue.price;

  const canSubmit =
    Boolean(range?.from && range?.to) &&
    nights > 0 &&
    guests >= 1 &&
    guests <= venue.maxGuests &&
    !isSubmitting;

  async function handleBook() {
    if (!range?.from || !range?.to) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await request('/holidaze/bookings', {
        method: 'POST',
        auth: true,
        body: {
          venueId: venue.id,
          dateFrom: range.from.toISOString(),
          dateTo: range.to.toISOString(),
          guests,
        },
      });

      toast.success('Booking created!');
      // Redirect to my bookings ?

      setRange(undefined);
      setGuests(1);
    } catch (e) {
      const msg = 'Something went wrong. Please try again.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-[300px] rounded-2xl border border-tertiary bg-white p-4 shadow-md sm:max-w-[398px] sm:p-6 md:max-w-[314px] lg:max-w-[398px]">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        defaultMonth={new Date()}
        weekStartsOn={1}
        disabled={[{ before: new Date() }, ...bookedRanges]}
        classNames={{
          root: 'text-secondary relative',
          day_button: 'h-9 w-9 sm:h-12 sm:w-12 md:h-9 md:w-9 lg:h-12 lg:w-12',
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
          <p className="font-semibold tracking-wide">{totalPrice} NOK</p>
        </div>

        <div className="flex items-center justify-between">
          <p>Guests:</p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white disabled:opacity-50"
              disabled={guests <= 1}
              aria-label="Decrease guests"
            >
              -
            </button>

            <p className="w-6 text-center font-semibold">{guests}</p>

            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(venue.maxGuests, g + 1))}
              className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white disabled:opacity-50"
              aria-label="Increae guests"
              disabled={guests >= venue.maxGuests}
            >
              +
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-error">
            Something went wrong. Please try again.
          </p>
        )}

        <Button
          variant="primary"
          type="button"
          fullWidth
          disabled={!canSubmit}
          onClick={handleBook}
        >
          {isSubmitting ? 'Booking...' : 'Book Now'}
        </Button>
      </div>
    </div>
  );
}
