import type { Venue } from './venues';
import { request } from './client';

type BookingVenue = Pick<Venue, 'id' | 'name' | 'price' | 'location' | 'media'>;

export type Booking = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  customer: {
    name: string;
  };
  venue?: BookingVenue;
};

export type BookingResponse = { data: Booking[] };

export async function deleteBooking(id: string): Promise<void> {
  await request(`/holidaze/bookings/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    auth: true,
  });
}
