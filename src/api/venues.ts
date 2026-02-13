import { request } from './client';
import type { Booking } from './bookings';

export type Venue = {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt?: string }[];
  price: number;
  location?: { city?: string; country?: string; address?: string };
  maxGuests: number;
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean };
  created: string;
  owner: VenueOwner;
  bookings?: Booking[];
};

export type VenueOwner = {
  name: string;
  email: string;
  bio?: string;
  avatar: {
    url: string;
    alt?: string;
  };
};

type VenueResponse = { data: Venue };
export type VenuesResponse = { data: Venue[]; meta?: { totalCount?: number } };

export async function getAllVenues(
  page = 1,
  limit = 12,
): Promise<VenuesResponse> {
  const res = await request<VenuesResponse>(
    `/holidaze/venues?sort=created&order=desc&limit=${limit}&page=${page}`,
    {
      auth: false,
    },
  );

  return {
    data: res.data,
    meta: res.meta,
  };
}

export async function getVenue(id: string) {
  const res = await request<VenueResponse>(
    `/holidaze/venues/${encodeURIComponent(id)}?_owner=true&_bookings=true`,
    {
      auth: false,
    },
  );
  return res.data;
}

export async function getVenuesByIds(ids: string[]) {
  const res = await Promise.all(
    ids.map(async (id) => {
      try {
        const venue = await getVenue(id);
        return { venue };
      } catch {
        return { failedId: id };
      }
    }),
  );

  const venues = res
    .map((r) => ('venue' in r ? r.venue : undefined))
    .filter((v): v is Venue => Boolean(v));

  const failedIds = res.filter((r) => 'failedId' in r).map((r) => r.failedId);

  return { venues, failedIds };
}

export async function searchVenues(
  query: string,
  page = 1,
  limit = 12,
): Promise<VenuesResponse> {
  const q = query.trim();
  if (!q) return { data: [], meta: { totalCount: 0 } };

  const res = await request<VenuesResponse>(
    `/holidaze/venues/search?q=${encodeURIComponent(q)}&sort=created&order=desc&limit=${limit}&page=${page}`,
    { auth: false },
  );

  return {
    data: res.data,
    meta: res.meta,
  };
}

export type VenueInput = {
  name: string;
  description: string;
  price: number;
  maxGuests: number;

  media?: { url: string; alt?: string }[];
  meta?: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };

  location?: {
    address?: string;
    city?: string;
    country?: string;
  };
};

export async function createVenue(body: VenueInput): Promise<Venue> {
  const res = await request<VenueResponse>('/holidaze/venues', {
    method: 'POST',
    auth: true,
    body,
  });

  return res.data;
}

export async function updateVenue(
  id: string,
  body: VenueInput,
): Promise<Venue> {
  const res = await request<VenueResponse>(
    `/holidaze/venues/${encodeURIComponent(id)}`,
    {
      method: 'PUT',
      auth: true,
      body,
    },
  );

  return res.data;
}

export async function deleteVenue(id: string): Promise<void> {
  await request(`/holidaze/venues/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    auth: true,
  });
}
