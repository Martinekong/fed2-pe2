import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVenue, type Venue } from '../../api/venues';
import VenueImgCarousel from '../../components/venues/VenueImgCarousel';

import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';

export default function VenuePage() {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    async function loadVenue() {
      setIsLoading(true);
      setError(null);

      try {
        if (!id) {
          setVenue(null);
          return;
        }

        const data = await getVenue(id);
        setVenue(data);
      } catch {
        setError('Could not load venue. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    loadVenue();
  }, [id]);

  if (isLoading) return <div className="page-wrapper">Loading...</div>;
  if (error) return <div className="page-wrapper text-error">{error}</div>;
  if (!venue) return <div className="page-wrapper">Venue not found</div>;

  console.log('venue', venue);

  return (
    <section className="page-wrapper gap-8">
      <VenueImgCarousel
        venueId={venue.id}
        media={venue.media}
        name={venue.name}
      />

      <div className="grid md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div>
            <h1>{venue.name}</h1>
            <div className="flex opacity-70">
              <FmdGoodOutlinedIcon fontSize="small" />
              <p className="text-sm">
                {venue.location.city ?? 'Unknown'},{' '}
                {venue.location.country ?? 'unknown'}
              </p>
            </div>
          </div>

          <div className="mt-auto flex items-center gap-1">
            <p className="text-4xl font-bold">${venue.price}</p>
            <p className="pt-4 text-sm">/ night</p>
          </div>

          <div>
            <h3>Description</h3>
            <p>{venue.description}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3>Specifications</h3>

            <div className="flex items-center gap-4 rounded-2xl border border-tertiary bg-white p-4">
              <BedOutlinedIcon />
              <p className="text-sm">Up to {venue.maxGuests} guests</p>
            </div>

            {venue.meta.wifi && (
              <div className="flex items-center gap-4 rounded-2xl border border-tertiary bg-white p-4">
                <WifiOutlinedIcon />
                <p className="text-sm">Wifi</p>
              </div>
            )}

            {venue.meta.breakfast && (
              <div className="flex items-center gap-4 rounded-2xl border border-tertiary bg-white p-4">
                <RestaurantOutlinedIcon />
                <p className="text-sm">Breakfast</p>
              </div>
            )}

            {venue.meta.parking && (
              <div className="flex items-center gap-4 rounded-2xl border border-tertiary bg-white p-4">
                <LocalParkingOutlinedIcon />
                <p className="text-sm">Parking</p>
              </div>
            )}

            {venue.meta.pets && (
              <div className="flex items-center gap-4 rounded-2xl border border-tertiary bg-white p-4">
                <PetsOutlinedIcon />
                <p className="text-sm">Pets allowed</p>
              </div>
            )}
          </div>

          <div>
            <h3>Venue Owner</h3>
            <div className="flex items-center gap-4 pt-4">
              <img
                src={venue.owner.avatar.url}
                alt={venue.owner.avatar.alt}
                className="h-10 w-10 rounded-full"
              />
              <p>{venue.owner.name}</p>
            </div>
          </div>
        </div>

        <div>
          {/* If user logged in: Booking with calendar */}
          {/* If user not logged in: Login btn to login page */}
          {/* If user logged in = venue manager: edit btn, delete btn, and upcoming bookings*/}
        </div>
      </div>
    </section>
  );
}
