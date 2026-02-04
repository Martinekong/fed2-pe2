import { request } from './client';
import type { BookingResponse } from './bookings';

export type Profile = {
  name: string;
  email: string;
  avatar: { url: string; alt: string };
  bio?: string;
  venueManager: boolean;
};

type ProfileResponse = { data: Profile };

export async function getProfile(name: string) {
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
  const res = await request<ProfileResponse>(`/holidaze/profiles/${name}`, {
    method: 'PUT',
    auth: true,
    body,
  });
  return res.data;
}

export async function getBookingsByProfile(name: string) {
  const res = await request<BookingResponse>(
    `/holidaze/profiles/${encodeURIComponent(name)}/bookings?_venue=true`,
    { auth: true },
  );
  return res.data;
}
