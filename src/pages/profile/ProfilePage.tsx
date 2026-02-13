import { useAuth } from '../../app/authContext';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

import SafeImage from '../../components/ui/SafeImage';
import LoadingLine from '../../components/ui/LoadingLine';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

export default function ProfilePage() {
  const { profile, isLoadingProfile, isVenueManager, loggedIn } = useAuth();

  return (
    <div className="page-wrapper gap-8">
      <h1>Profile</h1>

      {isLoadingProfile && <LoadingLine text="Getting your profile..." />}

      {!isLoadingProfile && (!loggedIn || !profile) && (
        <p className="text-error">Profile not found. Please log in again.</p>
      )}

      {!isLoadingProfile && loggedIn && profile && (
        <>
          <div className="flex flex-wrap gap-8">
            <SafeImage
              src={profile.avatar.url}
              alt={profile.avatar.alt || `${profile.name}'s avatar`}
              className="h-48 w-48 rounded-full object-cover"
            />
            <div className="flex flex-col items-start justify-center gap-4">
              <h2>{profile.name}</h2>
              <p>{profile.email}</p>
              {isVenueManager && (
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
            {isVenueManager && (
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
        </>
      )}
    </div>
  );
}
