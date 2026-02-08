import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ApiError } from '../../api/client';

import { getVenue, updateVenue, type VenueInput } from '../../api/venues';

import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';
import LoadingLine from '../../components/ui/LoadingLine';

type MediaRow = { url: string; alt: string };

type FieldErrors = {
  name?: string;
  description?: string;
  maxGuests?: string;
  price?: string;
};

export default function EditVenuePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    async function loadVenue() {
      if (!id) {
        setIsLoading(false);
        setApiError('Missing venue id.');
        return;
      }

      setIsLoading(true);
      try {
        const venue = await getVenue(id);

        setName(venue.name);
        setDescription(venue.description);
        setMaxGuests(String(venue.maxGuests));
        setPrice(String(venue.price));

        setAddress(venue.location?.address ?? '');
        setCity(venue.location?.city ?? '');
        setCountry(venue.location?.country ?? '');

        setMedia(
          venue.media && venue.media.length > 0
            ? venue.media.map((m) => ({
                url: m.url,
                alt: m.alt ?? '',
              }))
            : [{ url: '', alt: '' }],
        );

        setWifi(Boolean(venue.meta?.wifi));
        setBreakfast(Boolean(venue.meta?.breakfast));
        setParking(Boolean(venue.meta?.parking));
        setPets(Boolean(venue.meta?.pets));
      } catch (err) {
        setApiError('Could not load venue. Please try again');
      } finally {
        setIsLoading(false);
      }
    }

    loadVenue();
  }, [id]);

  function validate() {
    const error: FieldErrors = {};

    if (!name.trim()) error.name = 'Venue name is required';
    if (!description.trim()) error.description = 'Description is required';

    const maxGuestsNum = Number(maxGuests);
    const priceNum = Number(price);

    if (
      !maxGuests.trim() ||
      !Number.isFinite(maxGuestsNum) ||
      maxGuestsNum < 1
    ) {
      error.maxGuests = 'Max guests must be at least 1';
    }

    if (!price.trim() || !Number.isFinite(priceNum) || priceNum <= 0) {
      error.price = 'Price must be greater than 0';
    }

    setErrors(error);
    return { ok: Object.keys(error).length === 0 };
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
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanedMedia = media
        .map((m) => ({ url: m.url.trim(), alt: m.alt.trim() }))
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
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        maxGuests: Number(maxGuests),
        meta: { wifi, breakfast, parking, pets },
        ...(cleanedMedia.length > 0 ? { media: cleanedMedia } : {}),
        ...(location && { location }),
      };

      await updateVenue(id!, body);

      toast.success('Venue updated!');
      navigate('/manager/venues');
    } catch (err) {
      err instanceof ApiError
        ? setApiError(err.message)
        : setApiError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-wrapper gap-8">
      <h1>Edit Venue</h1>

      {isLoading && <LoadingLine text="Getting your venue..." />}

      {!isLoading && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-12">
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
              {isSubmitting ? 'Updating...' : 'Update venue'}
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
      )}
    </div>
  );
}
