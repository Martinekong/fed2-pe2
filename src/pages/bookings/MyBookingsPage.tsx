import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/ui/Button';
import BookingCard from '../../components/booking/BookingCard';

import { getUsername } from '../../lib/storage';
import { getBookingsByProfile } from '../../api/profiles';
import type { Booking } from '../../api/bookings';

export default function MyBookingsPage() {
  const username = getUsername();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        if (!username) {
          setError('Missing username. Please log in again.');
          setBookings([]);
          return;
        }

        const data = await getBookingsByProfile(username);
        //TODO: Sort by upcoming date first, then setBookings(sorted)
        setBookings(data);
        console.log('data:', data);
      } catch {
        setError('Could not load bookings. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [username]);

  function handleDelete(id: string) {
    //TODO: confirm modal + call delete endpoint
  }

  return (
    <div className="page-wrapper gap-8">
      <h1>My Bookings</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-error">{error}</p>}
      {!isLoading && !error && bookings.length === 0 && (
        <p>You have no bookings yet.</p>
      )}

      {!isLoading && !error && bookings.length > 0 && (
        <>
          <div className="flex flex-col gap-8">
            {bookings.map((b) => (
              <BookingCard key={b.id} booking={b} />
            ))}
          </div>

          <Link to="/venuea">
            <Button variant="primary" className="w-56">
              Go to venues
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
