import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllVenues, searchVenues, type Venue } from '../../api/venues';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function VenuesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') ?? '';
  const [search, setSearch] = useState(initialSearch);

  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const page = Number(searchParams.get('page') ?? '1');
  const limit = 12;
  const q = searchParams.get('search');

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const res = q
          ? await searchVenues(q, page, limit)
          : await getAllVenues(page, limit);
        setVenues(res.data);
      } catch {
        setError('Could not load venues. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [searchParams]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = search.trim();

    if (!q) {
      setSearchParams({ page: '1' });
      return;
    }

    setSearchParams({ search: q, page: '1' });
  }

  return (
    <div className="page-wrapper">
      <h1>Venues</h1>
      <form className="relative" onSubmit={handleSubmit}>
        <Input
          type="search"
          placeholder="Search for venues..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="primary"
          type="submit"
          className="absolute bottom-0 right-0 top-2"
        >
          Search
        </Button>
      </form>

      {error && <p className="pt-4 text-error">{error}</p>}
      {isLoading && <p className="pt-4">Loading...</p>}

      {!isLoading && !error && venues.length === 0 && (
        <p className="pt-4">No venues match your search.</p>
      )}

      {!isLoading && !error && venues.length > 0 && (
        <p className="pt-4">Found {venues.length} venues</p>
      )}
    </div>
  );
}
