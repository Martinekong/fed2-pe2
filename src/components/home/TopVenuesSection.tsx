import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getVenuesByIds, type Venue } from '../../api/venues';
import Button from '../ui/Button';
import LoadingLine from '../ui/LoadingLine';

import SafeImage from '../ui/SafeImage';

import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

const topVenuesIds = [
  '9de39374-ac34-46fa-8980-1b1e3aadd426',
  'c3e926fe-aa73-4a0a-a4b8-31bdf674dcda',
  '2a8ad58c-01e4-46a3-9f1b-b38bcb137c3b',
];

export default function TopVenuesSection() {
  const [topVenues, setTopVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTopVenues() {
      setIsLoading(true);
      setError(null);

      try {
        const { venues, failedIds } = await getVenuesByIds(topVenuesIds);
        setTopVenues(venues);

        if (failedIds.length === topVenuesIds.length) {
          setError('Top venues are unavailable right now.');
        }
      } catch {
        setError('Failed to load top venues. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    loadTopVenues();
  }, []);

  return (
    <section className="flex flex-col gap-2">
      <h2>top venues</h2>

      {isLoading && <LoadingLine text="Getting top venues..." />}

      {!isLoading && error && <p className="text-error">{error}</p>}

      {!isLoading && !error && topVenues.length === 0 && (
        <p>No top venues to show right now.</p>
      )}

      {!isLoading && !error && topVenues.length > 0 && (
        <article className="flex flex-col">
          {topVenues.map((venue) => (
            <div
              key={venue.id}
              className="border-accent_warm flex flex-col border-b py-8 md:grid md:grid-cols-2 md:gap-6"
            >
              <SafeImage
                src={venue.media[0].url}
                alt={venue.media[0].alt || venue.name}
                className="h-52 w-full rounded-2xl object-cover md:h-80"
              />

              <div className="flex flex-col gap-6 md:justify-between">
                <div className="mt-6 md:mt-0">
                  <h3>{venue.name}</h3>
                  <div className="flex opacity-70">
                    <FmdGoodOutlinedIcon fontSize="small" />
                    <p className="text-sm">
                      {venue.location?.city ?? 'Unknown'},{' '}
                      {venue.location?.country ?? 'unknown'}
                    </p>
                  </div>
                </div>

                <p className="line-clamp-5 leading-loose">
                  {venue.description}
                </p>

                <div className="flex items-center gap-8">
                  <Link to={`/venues/${venue.id}`}>
                    <Button variant="primary" className="w-32">
                      View more
                    </Button>
                  </Link>
                  <p>
                    Only{' '}
                    <span className="font-bold tracking-wide">
                      ${venue.price} /night
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </article>
      )}
    </section>
  );
}
