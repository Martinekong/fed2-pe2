import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function VenuesPage() {
  return (
    <div>
      <h1>Venues page</h1>
      <form className="relative">
        {/* get search param if in URL - fix this later - and add search functionality to this */}
        <Input type="search" placeholder="Search for venues..." />
        <Button
          variant="primary"
          type="submit"
          className="absolute bottom-0 right-0 top-2"
        >
          Search
        </Button>
      </form>
    </div>
  );
}
