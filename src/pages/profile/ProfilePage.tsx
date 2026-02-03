import { useEffect, useState } from 'react';
import { getProfile, type Profile } from '../../api/profiles';
import { getUsername } from '../../lib/storage';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

export default function ProfilePage() {
  const username = getUsername();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        if (!username) {
          setError('Missing username. Please log in again.');
          setProfile(null);
          return;
        }

        const data = await getProfile(username);
        setProfile(data);
      } catch {
        setError('Could not load profile.');
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [username]);

  if (isLoading) return <div className="page-wrapper">Loading...</div>;
  if (error) return <div className="page-wrapper text-error">{error}</div>;
  if (!profile) return <div className="page-wrapper">Profile not found</div>;

  return (
    <div className="page-wrapper gap-8">
      <h1>Profile page</h1>

      <div className="flex flex-wrap gap-8">
        <img
          src={profile.avatar.url}
          alt={profile.avatar.alt}
          className="h-48 w-48 rounded-full object-cover"
        />
        <div className="flex flex-col items-start justify-center gap-4">
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>
          {profile.venueManager && (
            <span className="rounded-2xl bg-tertiary px-4 py-2 text-center">
              Venue Manager
            </span>
          )}
        </div>
      </div>

      <div>
        <h3>About me:</h3>
        {profile.bio ? <p>{profile.bio}</p> : <p>Missing bio...</p>}
      </div>

      <Link to="/profile/edit">
        <Button variant="primary" className="w-52">
          Edit profile
        </Button>
      </Link>

      <div className="flex flex-col gap-4">
        <h3>Manage:</h3>
        <Link
          to="/bookings"
          className="flex items-center justify-between rounded-2xl border border-secondary p-4 shadow-md hover:shadow-lg"
        >
          <div className="flex items-center gap-4">
            <CalendarMonthOutlinedIcon />
            <p>My bookings</p>
          </div>
          <ChevronRightOutlinedIcon />
        </Link>
        {profile.venueManager && (
          <Link
            to="/manager/venues"
            className="flex items-center justify-between rounded-2xl border border-secondary p-4 shadow-md hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <CottageOutlinedIcon />
              <p>My venues</p>
            </div>
            <ChevronRightOutlinedIcon />
          </Link>
        )}
      </div>
    </div>
  );
}
