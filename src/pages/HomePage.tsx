import DiscoverSection from '../components/home/DiscoverSection';
import TopVenuesSection from '../components/home/TopVenuesSection';

export default function HomePage() {
  return (
    <div className="page-wrapper">
      <h1>Home page</h1>
      {/* Hero section */}
      <section></section>

      <DiscoverSection />
      <TopVenuesSection />

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
