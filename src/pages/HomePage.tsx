import DestinationSection from '../components/home/DestinationSection';
import DiscoverSection from '../components/home/DiscoverSection';
import HeroSection from '../components/home/HeroSection';
import TopVenuesSection from '../components/home/TopVenuesSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="page-wrapper">
        <DiscoverSection />
        <DestinationSection variant="cities" />
        <TopVenuesSection />
        <DestinationSection variant="tropics" />
        <DestinationSection variant="unexpected" />
      </div>
    </>
  );
}
