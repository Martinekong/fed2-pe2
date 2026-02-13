import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

import { type MediaRow } from './useVenueMedia';
import { type VenueFieldErrors } from '../../lib/venueValidation';

type Props = {
  name: string;
  setName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  maxGuests: string;
  setMaxGuests: (v: string) => void;
  price: string;
  setPrice: (v: string) => void;

  address: string;
  setAddress: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  country: string;
  setCountry: (v: string) => void;

  media: MediaRow[];
  addMediaRow: () => void;
  updateMediaRow: (index: number, patch: Partial<MediaRow>) => void;
  removeMediaRow: (index: number) => void;

  wifi: boolean;
  setWifi: (v: boolean) => void;
  breakfast: boolean;
  setBreakfast: (v: boolean) => void;
  parking: boolean;
  setParking: (v: boolean) => void;
  pets: boolean;
  setPets: (v: boolean) => void;

  isSubmitting: boolean;
  errors: VenueFieldErrors;
};

export function VenueForm({
  name,
  setName,
  description,
  setDescription,
  maxGuests,
  setMaxGuests,
  price,
  setPrice,
  address,
  setAddress,
  city,
  setCity,
  country,
  setCountry,
  media,
  addMediaRow,
  updateMediaRow,
  removeMediaRow,
  wifi,
  setWifi,
  breakfast,
  setBreakfast,
  parking,
  setParking,
  pets,
  setPets,
  isSubmitting,
  errors,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <h2>About</h2>
        <Input
          label="Name*"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of the venue"
          disabled={isSubmitting}
          error={errors.name}
        />
        <Textarea
          label="Description*"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your venue"
          disabled={isSubmitting}
          error={errors.description}
          className="min-h-[140px]"
        />
        <div className="flex flex-col gap-8 sm:flex-row">
          <Input
            label="Guests*"
            type="number"
            min={1}
            placeholder="Max guests (number)"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            disabled={isSubmitting}
            error={errors.maxGuests}
          />
          <Input
            label="Price/night ($)*"
            type="number"
            min={1}
            placeholder="800"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={isSubmitting}
            error={errors.price}
          />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <h2>Location</h2>
        <Input
          label="Address"
          placeholder="Venue address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={isSubmitting}
        />
        <div className="flex flex-col gap-8 sm:flex-row">
          <Input
            label="City"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={isSubmitting}
          />
          <Input
            label="Country"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <h2>Gallery</h2>

        <div className="flex flex-col gap-6">
          {media.map((row, i) => (
            <div key={i} className="flex flex-col gap-4">
              <Input
                label={i === 0 ? 'Image URL' : `Image URL (${i + 1})`}
                placeholder="Valid image URL"
                value={row.url}
                onChange={(e) => updateMediaRow(i, { url: e.target.value })}
                disabled={isSubmitting}
              />
              <Input
                label="Image text"
                placeholder="Describe your image"
                value={row.alt}
                onChange={(e) => updateMediaRow(i, { alt: e.target.value })}
                disabled={isSubmitting}
              />

              {media.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMediaRow(i)}
                  className="self-end text-sm hover:underline"
                  disabled={isSubmitting}
                >
                  Remove image
                </button>
              )}
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="secondary"
          className="ml-auto w-72"
          onClick={addMediaRow}
          disabled={isSubmitting}
        >
          Add image
        </Button>
      </div>

      <div className="flex flex-col gap-8">
        <h2>Includes</h2>
        <div className="grid gap-8 sm:grid-cols-2">
          <label className="flex items-center gap-4 rounded-2xl border-2 border-tertiary bg-white px-6 py-3 shadow-md">
            <input
              type="checkbox"
              className="h-4 w-4 accent-primary"
              checked={wifi}
              onChange={(e) => setWifi(e.target.checked)}
              disabled={isSubmitting}
            />
            <span>Wifi</span>
          </label>

          <label className="flex items-center gap-4 rounded-2xl border-2 border-tertiary bg-white px-6 py-3 shadow-md">
            <input
              type="checkbox"
              className="h-4 w-4 accent-primary"
              checked={breakfast}
              onChange={(e) => setBreakfast(e.target.checked)}
              disabled={isSubmitting}
            />
            <span>Breakfast</span>
          </label>

          <label className="flex items-center gap-4 rounded-2xl border-2 border-tertiary bg-white px-6 py-3 shadow-md">
            <input
              type="checkbox"
              className="h-4 w-4 accent-primary"
              checked={parking}
              onChange={(e) => setParking(e.target.checked)}
              disabled={isSubmitting}
            />
            <span>Parking</span>
          </label>

          <label className="flex items-center gap-4 rounded-2xl border-2 border-tertiary bg-white px-6 py-3 shadow-md">
            <input
              type="checkbox"
              className="h-4 w-4 accent-primary"
              checked={pets}
              onChange={(e) => setPets(e.target.checked)}
              disabled={isSubmitting}
            />
            <span>Pets allowed</span>
          </label>
        </div>
      </div>
    </>
  );
}
