import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getVenue, type Venue } from '../../api/venues';

import LoadingLine from '../../components/ui/LoadingLine';
import VenueImgCarousel from '../../components/venues/VenueImgCarousel';
import VenueDetails from '../../components/venues/VenueDetails';
import VenueRightPanel from '../../components/venues/VenueRightPanel';

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
          setError('Missing venue id.');
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

  return (
    <section className="page-wrapper">
      {isLoading && <LoadingLine text="Getting venue..." />}
      {!isLoading && error && <p className="text-error">{error}</p>}
      {!isLoading && !error && !venue && <p>Venue not found.</p>}
      {!isLoading && !error && venue && (
        <>
          <VenueImgCarousel
            venueId={venue.id}
            media={venue.media}
            name={venue.name}
          />

          <div className="flex flex-col gap-20 md:grid md:grid-cols-2">
            <VenueDetails venue={venue} />
            <VenueRightPanel venue={venue} />
          </div>
        </>
      )}
    </section>
  );
}
