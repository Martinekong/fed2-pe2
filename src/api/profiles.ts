import { request } from './client';

export type Profile = {
  name: string;
  email: string;
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
