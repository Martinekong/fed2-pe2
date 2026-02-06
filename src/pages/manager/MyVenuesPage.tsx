import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';

import { getUsername } from '../../lib/storage';
import { deleteVenue, type Venue } from '../../api/venues';
import { getVenuesByProfile } from '../../api/profiles';

import ConfirmModal from '../../components/ui/ConfirmModal';
import toast from 'react-hot-toast';

export default function MyVenuesPage() {
  const navigate = useNavigate();

  const username = getUsername();

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
      <h1>My Venues</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-error">{error}</p>}
      {!isLoading && !error && venues.length === 0 && (
        <p>You have no venues yet.</p>
      )}

      {!isLoading && !error && venues.length > 0 && (
        <>
          <div>You have {venues.length} venues</div>
        </>
      )}
    </div>
  );
}
