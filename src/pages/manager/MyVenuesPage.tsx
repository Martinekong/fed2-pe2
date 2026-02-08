import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/authContext';
import toast from 'react-hot-toast';

import Button from '../../components/ui/Button';
import MyVenueCard from '../../components/venues/MyVenueCard';
import ConfirmModal from '../../components/ui/ConfirmModal';

import { deleteVenue, type Venue } from '../../api/venues';
import { getVenuesByProfile } from '../../api/profiles';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LoadingLine from '../../components/ui/LoadingLine';
import CardSkeleton from '../../components/booking/CardSkeleton';

export default function MyVenuesPage() {
  const navigate = useNavigate();

  const { username } = useAuth();

  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        if (!username) {
          setError('Missing username. Please log in again.');
          setVenues([]);
          return;
        }

        const data = await getVenuesByProfile(username);
        setVenues(data);
        console.log('data:', data);
      } catch {
        setError('Could not load venues. Please try again');
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [username]);

  function handleEditClick(id: string) {
    navigate(`/manager/venues/${id}/edit`);
  }

  function handleDeleteClick(id: string) {
    setDeleteId(id);
  }

  async function handleConfirmDelete() {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      await deleteVenue(deleteId);
      setVenues((prev) => prev.filter((b) => b.id !== deleteId));
      toast.success('Venue deleted');
      setDeleteId(null);
    } catch {
      toast.error('Could not delete venue');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="page-wrapper gap-8">
      <div className="flex flex-wrap justify-between gap-6">
        <h1>My Venues</h1>
        <Link to={'/manager/venues/create'} className="mb-2 mt-auto">
          <Button variant="primary" className="w-56" disabled={isLoading}>
            <AddOutlinedIcon fontSize="small" className="mr-2" />
            Add venue
          </Button>
        </Link>
      </div>

      {isLoading && (
        <>
          <LoadingLine text="Getting your venues..." />
          <CardSkeleton />
        </>
      )}

      {!isLoading && error && <p className="text-error">{error}</p>}

      {!isLoading && !error && venues.length === 0 && (
        <p>You have no venues yet.</p>
      )}

      {!isLoading && !error && venues.length > 0 && (
        <>
          <div>You have {venues.length} venues:</div>
          <div className="flex flex-col gap-8">
            {venues.map((v) => (
              <MyVenueCard
                key={v.id}
                venue={v}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          <ConfirmModal
            open={deleteId !== null}
            title="venue"
            onClose={() => !isDeleting && setDeleteId(null)}
            onConfirm={handleConfirmDelete}
            isConfirming={isDeleting}
          />
        </>
      )}
    </div>
  );
}
