import DestinationSection from '../components/home/DestinationSection';
import DiscoverSection from '../components/home/DiscoverSection';
import TopVenuesSection from '../components/home/TopVenuesSection';

export default function HomePage() {
  return (
    <div className="page-wrapper">
      <h1>Home page</h1>
      {/* Hero section */}
      <section></section>

      <DiscoverSection />
      <DestinationSection variant="cities" />
      <TopVenuesSection />
      <DestinationSection variant="tropics" />
      <DestinationSection variant="unexpected" />
    </div>
  );
}
