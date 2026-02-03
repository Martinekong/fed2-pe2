import { request } from './client';

export type Profile = {
  name: string;
  email: string;
  banner: {
    url: string;
    alt: string;
  };
  avatar: {
    url: string;
    alt: string;
  };
  bio: string;
  venueManager: boolean;
  // include _bookings
  // include _ venues
};

type ProfileResponse = { data: Profile };

export async function getProfile(name: string) {
  const res = await request<ProfileResponse>(
    `/holidaze/profiles/${encodeURIComponent(name)}`,
    // include ?_venues=true&_bookings=true
    { auth: true },
  );
  return res.data;
}
