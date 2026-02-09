import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { createVenue, type VenueInput } from '../../api/venues';
import { ApiError } from '../../api/client';

import { venueSchema } from '../../lib/validation';

import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';

type MediaRow = { url: string; alt: string };

type FieldErrors = {
  name?: string;
  description?: string;
  maxGuests?: string;
  price?: string;
};

export default function CreateVenuePage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [price, setPrice] = useState('');

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const [media, setMedia] = useState<MediaRow[]>([{ url: '', alt: '' }]);

  const [wifi, setWifi] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [parking, setParking] = useState(false);
  const [pets, setPets] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);

  function validate() {
    const result = venueSchema.safeParse({
      name,
      description,
      maxGuests,
      price,
    });

    if (result.success) {
      setErrors({});
      return { ok: true as const, data: result.data };
    }

    const fieldErrors: FieldErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (
        field === 'name' ||
        field === 'description' ||
        field === 'maxGuests' ||
        field === 'price'
      ) {
        fieldErrors[field] = issue.message;
      }
    }

    setErrors(fieldErrors);
    return { ok: false as const };
  }

  function clearFieldError<K extends keyof FieldErrors>(key: K) {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function addImageRow() {
    setMedia((prev) => [...prev, { url: '', alt: '' }]);
  }

  function updateMediaRow(index: number, patch: Partial<MediaRow>) {
    setMedia((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  }

  function removeMediaRow(index: number) {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError(null);

    const validation = validate();
    if (!validation.ok) {
      toast.error('Please fix the errors in the form');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanedMedia = media
        .map((m) => ({
          url: m.url.trim(),
          alt: m.alt.trim(),
        }))
        .filter((m) => m.url);

      const location =
        address.trim() || city.trim() || country.trim()
          ? {
              ...(address.trim() && { address: address.trim() }),
              ...(city.trim() && { city: city.trim() }),
              ...(country.trim() && { country: country.trim() }),
            }
          : undefined;

      const body: VenueInput = {
        name: validation.data.name,
        description: validation.data.description,
        price: validation.data.price,
        maxGuests: validation.data.maxGuests,
        meta: { wifi, breakfast, parking, pets },
        ...(cleanedMedia.length > 0 ? { media: cleanedMedia } : {}),
        ...(location && { location }),
      };

      const created = await createVenue(body);

      toast.success('Venue created!');

      navigate(`/venues/${created.id}`);
    } catch (err) {
      err instanceof ApiError
        ? setApiError(err.message)
        : setApiError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="m-8 mx-auto flex max-w-[800px] flex-col gap-8 px-4">
      <h1>Create venue</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-12">
        <div className="flex flex-col gap-8">
          <h2>About</h2>
          <Input
            label="Name*"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearFieldError('name');
            }}
            placeholder="Name of the venue"
            disabled={isSubmitting}
            error={errors.name}
          />
          <Textarea
            label="Description*"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              clearFieldError('description');
            }}
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
              onChange={(e) => {
                setMaxGuests(e.target.value);
                clearFieldError('maxGuests');
              }}
              disabled={isSubmitting}
              error={errors.maxGuests}
            />
            <Input
              label="Price/night ($)*"
              type="number"
              min={1}
              placeholder="800"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                clearFieldError('price');
              }}
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
            onClick={addImageRow}
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

        <div className="grid gap-8 sm:grid-cols-2">
          <Button
            variant="primary"
            fullWidth
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create venue'}
          </Button>

          <Link to="/manager/venues" className="w-full">
            <Button
              variant="secondary"
              fullWidth
              type="button"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </Link>
        </div>

        {apiError && <p className="pl-2 text-error">Error: {apiError}</p>}
      </form>
    </div>
  );
}
