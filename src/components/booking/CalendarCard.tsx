import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { type DateRange } from 'react-day-picker';
import { addDays, parseISO } from 'date-fns';
import Calendar from './Calendar';

import { createBooking, type CreateBookingInput } from '../../api/bookings';
import { ApiError } from '../../api/client';
import type { Venue } from '../../api/venues';

import Button from '../ui/Button';

import { nightsBetween } from '../../utils/date';
import GuestButtons from './GuestButtons';
import BookingTotal from './BookingTotal';

type Props = { venue: Venue };

export default function CalendarCard({ venue }: Props) {
  const navigate = useNavigate();

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
    if (!canSubmit || !range?.from || !range?.to) return;

    setIsSubmitting(true);
    setError(null);

    const body: CreateBookingInput = {
      venueId: venue.id,
      dateFrom: range.from.toISOString(),
      dateTo: range.to.toISOString(),
      guests,
    };

    try {
      const booking = await createBooking(body);

      toast.success('Booking created!');
      navigate(`/bookings/${booking.id}`);
    } catch (err) {
      err instanceof ApiError
        ? setError(err.message)
        : setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-[300px] rounded-2xl border border-black/5 bg-white p-4 text-secondary shadow-lg sm:max-w-[398px] sm:p-6 md:mx-auto md:max-w-[314px] lg:max-w-[398px]">
      <Calendar range={range} onSelect={setRange} disabled={bookedRanges} />

      <div className="mt-6 flex flex-col gap-4">
        <BookingTotal nights={nights} totalPrice={totalPrice} />

        <GuestButtons
          value={guests}
          onChange={setGuests}
          max={venue.maxGuests}
          disabled={isSubmitting}
        />

        {error && <p className="text-sm text-error">{error}</p>}

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
