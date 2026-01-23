import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import TopVenues from '../components/venues/TopVenues';

export default function HomePage() {
  return (
    <div className="page-wrapper">
      <h1>Home page</h1>
      {/* Hero section */}
      <section></section>

      {/* Discover section with search field */}
      <section className="flex flex-col gap-5">
        <h2>discover</h2>
        <p>
          Search through all venues hosted by Holidaze. Wether you dream about
          the tropics or mountains, want to sleep in a cabin or castle,
          experience city life or the beach - we've got you!
        </p>
        <form className="relative">
          <Input type="search" placeholder="Search for venues..." />
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

      {/* Top venues section */}
      <TopVenues />

      {/* Experience city life */}
      <section>
        <h2>experience city life</h2>
      </section>

      {/* Travel to the tropics */}
      <section>
        <h2>travel to the tropics</h2>
      </section>

      {/* Explore the unexpected */}
      <section>
        <h2>explore the unexpected</h2>
      </section>
    </div>
  );
}
