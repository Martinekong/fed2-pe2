import { useEffect, useState } from 'react';
import VenueGrid from '../../components/venues/VenueGrid';
import VenueGridSkeleton from '../../components/venues/VenueGridSkeleton';
import { getFavorites, setFavorites } from '../../lib/storage';
import { getVenuesByIds, type Venue } from '../../api/venues';

export default function FavoritesPage() {
  const [favoritesIds, setFavoritesIds] = useState<string[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFavoritesIds(getFavorites());
  }, []);

  useEffect(() => {
    async function loadFavorites() {
      setIsLoading(true);
      setError(null);

      try {
        if (favoritesIds.length === 0) {
          setVenues([]);
          return;
        }

        const { venues, failedIds } = await getVenuesByIds(favoritesIds);
        setVenues(venues);

        if (failedIds.length > 0) {
          const updatedIds = favoritesIds.filter(
            (id) => !failedIds.includes(id),
          );

          setFavoritesIds(updatedIds);
          setFavorites(updatedIds);
        }
      } catch {
        setError('Could not load favorites. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    loadFavorites();
  }, [favoritesIds]);

  function handleFavoriteChange(venueId: string, nowFavorite: boolean) {
    if (!nowFavorite) {
      setVenues((prev) => prev.filter((v) => v.id !== venueId));
      setFavoritesIds((prev) => prev.filter((id) => id !== venueId));
    }
  }

  return (
    <div className="page-wrapper gap-8">
      <h1>Favorites</h1>

      {isLoading && <VenueGridSkeleton count={12} />}

      {!isLoading && error && <p className="text-error">{error}</p>}

      {!isLoading && !error && venues.length === 0 && (
        <p>You have no favorited venues</p>
      )}
      {!isLoading && !error && venues.length > 0 && (
        <VenueGrid venues={venues} onFavoriteChange={handleFavoriteChange} />
      )}
    </div>
  );
}
