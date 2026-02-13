import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { createVenue, type VenueInput } from '../../api/venues';
import { getErrorMessage } from '../../api/getErrorMessage';

import {
  validateVenue,
  type VenueFieldErrors,
} from '../../lib/venueValidation';

import { useVenueMedia } from '../../components/manager/useVenueMedia';
import { VenueForm } from '../../components/manager/VenueForm';
import Button from '../../components/ui/Button';

export default function CreateVenuePage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [price, setPrice] = useState('');

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const { media, addMediaRow, updateMediaRow, removeMediaRow } =
    useVenueMedia();

  const [wifi, setWifi] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [parking, setParking] = useState(false);
  const [pets, setPets] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<VenueFieldErrors>({});

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

      toast.success('Your venue has been created!');

      navigate(`/venues/${created.id}`);
    } catch (err) {
      toast.error(
        getErrorMessage(err, 'Something went wrong. Please try again.'),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="m-8 mx-auto flex max-w-[800px] flex-col gap-8 px-4">
      <h1>Create venue</h1>
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
      </form>
    </div>
  );
}
