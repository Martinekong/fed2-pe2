import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function DiscoverSection() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();

    const query = search.trim();
    if (!query) return;

    navigate(`/venues?search=${encodeURIComponent(query)}`);
  }

  return (
    <section className="flex scroll-mt-24 flex-col gap-5" id="discover">
      <h2>discover</h2>
      <p>
        Search through all venues hosted by Holidaze. Wether you dream about the
        tropics or mountains, want to sleep in a cabin or castle, experience
        city life or the beach - we've got you!
      </p>
      <form className="relative" onSubmit={handleSearchSubmit}>
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
        {/* Add search functionality: redirect to "/venues", and add the search input as a query */}
      </form>
    </section>
  );
}
