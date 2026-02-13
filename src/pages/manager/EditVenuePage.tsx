import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { getVenue, updateVenue, type VenueInput } from '../../api/venues';

import {
  validateVenue,
  type VenueFieldErrors,
} from '../../lib/venueValidation';

import { useVenueMedia } from '../../components/manager/useVenueMedia';

import { VenueForm } from '../../components/manager/VenueForm';

import Button from '../../components/ui/Button';
import LoadingLine from '../../components/ui/LoadingLine';
import { getErrorMessage } from '../../api/getErrorMessage';

export default function EditVenuePage() {
  const { id } = useParams();
  if (!id) {
    return (
      <div className="page-wrapper gap-8">
        <h1>Edit Venue</h1>
        <p className="text-error">Missing venue id.</p>
      </div>
    );
  }

  const venueId = id;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [price, setPrice] = useState('');

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const { media, setMedia, addMediaRow, updateMediaRow, removeMediaRow } =
    useVenueMedia();

  const [wifi, setWifi] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [parking, setParking] = useState(false);
  const [pets, setPets] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<VenueFieldErrors>({});
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVenue() {
      setIsLoading(true);
      setLoadError(null);
      try {
        const venue = await getVenue(venueId);

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
      } catch {
        setLoadError('Could not load venue. Please try again');
      } finally {
        setIsLoading(false);
      }
    }

    loadVenue();
  }, [venueId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validation = validateVenue({ name, description, maxGuests, price });
    if (!validation.ok) {
      setErrors(validation.fieldErrors);
      toast.error('Please fix the errors in the form');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setErrors({});
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
        name: validation.data.name,
        description: validation.data.description,
        price: validation.data.price,
        maxGuests: validation.data.maxGuests,
        meta: { wifi, breakfast, parking, pets },
        ...(cleanedMedia.length > 0 ? { media: cleanedMedia } : {}),
        ...(location && { location }),
      };

      const updated = await updateVenue(venueId, body);

      toast.success('Venue updated!');

      navigate(`/venues/${updated.id}`);
    } catch (err) {
      toast.error(
        getErrorMessage(err, 'Something went wrong. Please try again.'),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-wrapper gap-8">
      <h1>Edit Venue</h1>

      {isLoading && <LoadingLine text="Getting your venue..." />}

      {!isLoading && loadError && (
        <p className="pl-2 text-error">Error: {loadError}</p>
      )}

      {!isLoading && !loadError && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-12">
          <VenueForm
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            maxGuests={maxGuests}
            setMaxGuests={setMaxGuests}
            price={price}
            setPrice={setPrice}
            address={address}
            setAddress={setAddress}
            city={city}
            setCity={setCity}
            country={country}
            setCountry={setCountry}
            media={media}
            addMediaRow={addMediaRow}
            updateMediaRow={updateMediaRow}
            removeMediaRow={removeMediaRow}
            wifi={wifi}
            setWifi={setWifi}
            breakfast={breakfast}
            setBreakfast={setBreakfast}
            parking={parking}
            setParking={setParking}
            pets={pets}
            setPets={setPets}
            isSubmitting={isSubmitting}
            errors={errors}
          />

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
        </form>
      )}
    </div>
  );
}
