import type { Venue } from './venues';

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
