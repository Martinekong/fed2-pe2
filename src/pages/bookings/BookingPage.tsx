import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { differenceInCalendarDays, format } from 'date-fns';
import toast from 'react-hot-toast';

import {
  deleteBooking,
  getSingleBooking,
  updateBooking,
  type Booking,
} from '../../api/bookings';

import Button from '../../components/ui/Button';
import CalendarModal from '../../components/booking/CalendarModal';
import ConfirmModal from '../../components/ui/ConfirmModal';
import VenueImgCarousel from '../../components/venues/VenueImgCarousel';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import LoadingLine from '../../components/ui/LoadingLine';
import VenueSpecifications from '../../components/venues/VenueSpecifications';

export default function BookingPage() {
  const navigate = useNavigate();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        if (!id) {
          setBooking(null);
          return;
        }

        const data = await getSingleBooking(id);
        setBooking(data);
      } catch {
        setError('Could not load booking. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [id]);

  function nightsBetween(dateFrom: string, dateTo: string) {
    return Math.max(
      0,
      differenceInCalendarDays(new Date(dateTo), new Date(dateFrom)),
    );
  }

  function formatRange(dateFrom: string, dateTo: string) {
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    return `${format(from, 'dd/MM/yy')} - ${format(to, 'dd/MM/yy')}`;
  }

  return (
    <div className="page-wrapper gap-8 md:grid md:grid-cols-2">
      <h1 className="md:col-span-2">Your booking</h1>

      {isLoading && <LoadingLine text="Getting your booking..." />}

      {!isLoading && error && <p className="text-error">{error}</p>}

      {!isLoading && !error && !booking && <p>Booking not found.</p>}

      {!isLoading &&
        !error &&
        booking &&
        (() => {
          const nights = nightsBetween(booking.dateFrom, booking.dateTo);
          const dateRange = formatRange(booking.dateFrom, booking.dateTo);
          const pricePerNight = booking.venue?.price ?? 0;
          const total = nights * pricePerNight;

          return (
            <>
              <div className="md:col-span-2">
                <VenueImgCarousel
                  venueId={booking.venue!.id}
                  media={booking.venue!.media}
                  name={booking.venue!.name}
                />
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-8">
                  <h2>Booking details</h2>

                  <div className="flex items-center gap-4">
                    <PersonOutlineOutlinedIcon fontSize="small" />
                    <p>{booking.customer.name}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <BedOutlinedIcon fontSize="small" />
                    <p>{booking.guests} guests</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <BedtimeOutlinedIcon fontSize="small" />
                    <p>{nights} nights</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <AccountBalanceWalletOutlinedIcon fontSize="small" />
                    <p>{booking.venue?.price} NOK per night </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <CalendarMonthOutlinedIcon fontSize="small" />
                    <p>{dateRange}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="border-b border-t border-tertiary py-8 tracking-wider">
                    Total: {total} NOK
                  </h3>
                  <div className="mt-auto">
                    <Button
                      variant="primary"
                      className="mb-4 w-72"
                      type="button"
                      onClick={() => setEditOpen(true)}
                      disabled={isEditing || isDeleting}
                    >
                      Edit booking
                    </Button>
                    <Button
                      variant="tertiary"
                      className="w-72"
                      type="button"
                      onClick={() => setDeleteOpen(true)}
                      disabled={isEditing || isDeleting}
                    >
                      Delete booking
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <h2>Venue details</h2>

                <div>
                  <h3>{booking.venue?.name}</h3>
                  <div className="flex opacity-70">
                    <FmdGoodOutlinedIcon fontSize="small" />
                    <p className="text-sm">
                      {booking.venue?.location.city || 'Unknown'},{' '}
                      {booking.venue?.location.country || 'Unknown'}
                    </p>
                  </div>
                </div>

                <div>
                  <h3>Description</h3>
                  <p>{booking.venue?.description}</p>
                </div>

                <VenueSpecifications
                  maxGuests={booking.venue?.maxGuests}
                  meta={booking.venue?.meta}
                />

                <div>
                  <h3>Venue Owner</h3>
                  <div className="flex items-center gap-4 pt-4">
                    <img
                      src={booking.venue?.owner.avatar.url}
                      alt={booking.venue?.owner.avatar.alt}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <p>{booking.venue?.owner.name}</p>
                  </div>
                </div>
              </div>

              <CalendarModal
                open={editOpen}
                booking={booking}
                isSaving={isEditing}
                onClose={() => !isEditing && setEditOpen(false)}
                onSave={async (next) => {
                  setIsEditing(true);
                  try {
                    const updated = await updateBooking(booking.id, next);

                    setBooking((prev) =>
                      prev ? { ...prev, ...updated } : prev,
                    );

                    toast.success('Booking updated!');
                    setEditOpen(false);
                  } catch {
                    toast.error('Could not update booking. Please try again.');
                  } finally {
                    setIsEditing(false);
                  }
                }}
              />

              <ConfirmModal
                open={deleteOpen}
                title="booking"
                isConfirming={isDeleting}
                onClose={() => !isDeleting && setDeleteOpen(false)}
                onConfirm={async () => {
                  setIsDeleting(true);
                  try {
                    await deleteBooking(booking.id);
                    toast.success('Booking deleted!');
                    navigate('/bookings');
                  } catch {
                    toast.error('Could not delete booking. Please try again.');
                  } finally {
                    setIsDeleting(false);
                  }
                }}
              />
            </>
          );
        })()}
    </div>
  );
}
