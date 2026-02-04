import type { Venue } from './venues';
import { request } from './client';

type BookingVenue = Pick<
  Venue,
  'id' | 'name' | 'price' | 'location' | 'media' | 'maxGuests'
>;

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
export type BookingSingleResponse = { data: Booking };

export type UpdateBookingInput = {
  dateFrom?: string;
  dateTo?: string;
  guests?: number;
};

export async function updateBooking(
  id: string,
  body: UpdateBookingInput,
): Promise<Booking> {
  const res = await request<BookingSingleResponse>(
    `/holidaze/bookings/${encodeURIComponent(id)}`,
    {
      method: 'PUT',
      auth: true,
      body,
    },
  );

  return res.data;
}

export async function deleteBooking(id: string): Promise<void> {
  await request(`/holidaze/bookings/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    auth: true,
  });
}
