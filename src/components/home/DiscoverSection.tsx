import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import toast from 'react-hot-toast';

export default function DiscoverSection() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();

    const query = search.trim();
    if (!query) {
      toast('Looks like you forgot to type your search...');
      return;
    }

    navigate(`/venues?search=${encodeURIComponent(query)}`);
  }

  return (
    <section className="flex scroll-mt-24 flex-col gap-5" id="discover">
      <h2>discover</h2>
      <p className="leading-relaxed tracking-wide">
        Search through all venues hosted by Holidaze. Whether you dream about
        the tropics or mountains, want to sleep in a cabin or castle, experience
        city life or the beach - we've got you covered!
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
          className="absolute bottom-0 right-0 top-2 w-28"
        >
          Search
        </Button>
      </form>
    </section>
  );
}
