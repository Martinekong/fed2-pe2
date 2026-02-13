import { request } from './client';
import type { Booking, BookingResponse } from './bookings';
import type { Venue, VenuesResponse } from './venues';

export type Profile = {
  name: string;
  email: string;
  avatar: { url: string; alt?: string };
  bio?: string;
  venueManager: boolean;
};

type ProfileResponse = { data: Profile };

export async function getProfile(name: string): Promise<Profile> {
  const res = await request<ProfileResponse>(
    `/holidaze/profiles/${encodeURIComponent(name)}`,
    { auth: true },
  );
  return res.data;
}

export type UpdateProfileInput = {
  bio?: string;
  avatar?: { url: string; alt?: string };
  venueManager?: boolean;
};

export async function updateProfile(
  name: string,
  body: UpdateProfileInput,
): Promise<Profile> {
  const res = await request<ProfileResponse>(
    `/holidaze/profiles/${encodeURIComponent(name)}`,
    {
      method: 'PUT',
      auth: true,
      body,
    },
  );
  return res.data;
}

export async function getBookingsByProfile(name: string): Promise<Booking[]> {
  const res = await request<BookingResponse>(
    `/holidaze/profiles/${encodeURIComponent(name)}/bookings?_venue=true`,
    { auth: true },
  );
  return res.data;
}

export async function getVenuesByProfile(name: string): Promise<Venue[]> {
  const res = await request<VenuesResponse>(
    `/holidaze/profiles/${encodeURIComponent(name)}/venues?_bookings=true`,
    { auth: true },
  );
  return res.data;
}
