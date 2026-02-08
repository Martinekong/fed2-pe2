import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllVenues, searchVenues, type Venue } from '../../api/venues';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import VenueGrid from '../../components/venues/VenueGrid';
import VenueGridSkeleton from '../../components/venues/VenueGridSkeleton';
import Pagination from '../../components/ui/Pagination';

import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import MuiPagination from '../../components/ui/Pagination';

export default function VenuesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') ?? '';
  const [search, setSearch] = useState(initialSearch);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setSearch(searchParams.get('search') ?? '');
  }, [searchParams]);

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
        const totalCount = res.meta?.totalCount ?? res.data.length;
        setTotalPages(Math.max(1, Math.ceil(totalCount / limit)));
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

  function handleViewAll() {
    setSearch('');
    setSearchParams({ page: '1' });
  }

  function goToPage(nextPage: number) {
    const safe = Math.max(1, Math.min(totalPages, nextPage));

    const params: Record<string, string> = { page: String(safe) };
    const currentSearch = searchParams.get('search');
    if (currentSearch) params.search = currentSearch;

    setSearchParams(params);
  }

  return (
    <div className="page-wrapper gap-8">
      <h1>Venues</h1>
      <div className="flex flex-wrap items-center gap-4 sm:gap-8">
        <form className="relative flex-1" onSubmit={handleSubmit}>
          <Input
            type="search"
            placeholder="Search venues..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-0"
          />
          <Button
            variant="primary"
            type="submit"
            className="absolute bottom-0 right-0 top-0 sm:w-28"
          >
            Search
          </Button>
        </form>

        <button
          type="button"
          onClick={handleViewAll}
          aria-label="View all venues"
          disabled={!searchParams.get('search')}
          title="View all venues"
          className="flex h-12 items-center gap-2"
        >
          <AllInclusiveIcon />
          View all
        </button>
      </div>

      {error && <p className="text-error">{error}</p>}
      {isLoading && <VenueGridSkeleton count={limit} />}

      {!isLoading && !error && venues.length === 0 && (
        <p>No venues match your search.</p>
      )}

      {!isLoading && !error && venues.length > 0 && (
        <>
          <VenueGrid venues={venues} />
          {/* <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={goToPage}
          /> */}
          <MuiPagination
            page={page}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </>
      )}
    </div>
  );
}
