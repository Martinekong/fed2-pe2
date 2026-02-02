import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVenue, type Venue } from '../../api/venues';
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

      <div className="grid gap-20 md:grid-cols-2">
        <VenueDetails venue={venue} />

        <div>
          <VenueRightPanel venue={venue} />
        </div>
      </div>
    </section>
  );
}
