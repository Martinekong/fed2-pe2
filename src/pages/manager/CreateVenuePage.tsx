import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

export default function CreateVenuePage() {
  return (
    <div className="m-8 mx-auto flex max-w-[800px] flex-col gap-8 px-4">
      <h1>Create venue</h1>
      <form className="flex flex-col gap-12">
        <div className="flex flex-col gap-8">
          <h2>About</h2>
          <Input label="Name*" type="text" placeholder="Name of the venue" />
          <Textarea label="Description*" placeholder="Describe your venue" />
          <div className="flex flex-col gap-8 sm:flex-row">
            <Input label="Guests*" placeholder="Max guests (number)" />
            <Input label="Price/night (NOK)*" placeholder="800" />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <h2>Location</h2>
          <Input label="Address" placeholder="Venue address" />
          <div className="flex flex-col gap-8 sm:flex-row">
            <Input label="City" placeholder="Enter city" />
            <Input label="Country" placeholder="Enter country" />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <h2>Gallery</h2>
          <div className="flex flex-col gap-4">
            <Input label="Image URL" placeholder="Valid image URL" />
            <Input label="Image text" placeholder="Describe your image" />
          </div>
          {/* When clicking this button, another div like the one above should appear... */}
          <Button variant="secondary" className="ml-auto w-72">
            Add image
          </Button>
        </div>

        <div className="flex flex-col gap-8">
          <h2>Includes</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <label className="flex items-center gap-4 rounded-2xl border-2 border-tertiary bg-white px-6 py-3 shadow-md">
              <input type="checkbox" className="h-4 w-4 accent-primary" />
              <span>Wifi</span>
            </label>
            <label className="flex items-center gap-4 rounded-2xl border-2 border-tertiary bg-white px-6 py-3 shadow-md">
              <input type="checkbox" className="h-4 w-4 accent-primary" />
              <span>Breakfast</span>
            </label>
            <label className="flex items-center gap-4 rounded-2xl border-2 border-tertiary bg-white px-6 py-3 shadow-md">
              <input type="checkbox" className="h-4 w-4 accent-primary" />
              <span>Parking</span>
            </label>
            <label className="flex items-center gap-4 rounded-2xl border-2 border-tertiary bg-white px-6 py-3 shadow-md">
              <input type="checkbox" className="h-4 w-4 accent-primary" />
              <span>Pets allowed</span>
            </label>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <Button variant="primary" fullWidth>
            Create venue
          </Button>
          <Link to="/manager/venues" className="w-full">
            <Button variant="secondary" fullWidth>
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
