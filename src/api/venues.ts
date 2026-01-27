import { request } from './client';

export type Venue = {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  price: number;
  location: { city: string; country: string };
  maxGuests: number;
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean };
  created: string;
};

type VenueResponse = { data: Venue };
type VenuesResponse = { data: Venue[]; meta?: { totalCount?: number } };

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

  console.log(res);
  return {
    data: res.data,
    meta: res.meta,
  };
}

export async function getVenue(id: string) {
  const res = await request<VenueResponse>(`/holidaze/venues/${id}`, {
    auth: false,
  });
  return res.data;
}

export async function getVenuesByIds(ids: string[]) {
  const venues = await Promise.all(ids.map((id) => getVenue(id)));
  return venues;
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

  console.log(res);
  return {
    data: res.data,
    meta: res.meta,
  };
}

// createVenue
// updateVenue
// deleteVenue
