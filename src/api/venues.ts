import { request } from './client';

export type Venue = {
  id: string;
  name: string;
  description: string;
  media: [{ url: string; alt: string }];
  price: number;
  location: { city: string; country: string };
};

type VenueResponse = { data: Venue };

// getAllVenues

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

// createVenue
// updateVenue
// deleteVenue
// searchVenue
