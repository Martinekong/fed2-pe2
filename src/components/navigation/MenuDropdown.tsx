import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getToken, getUsername, clearAuthStorage } from '../../lib/storage';
import { getProfile, type Profile } from '../../api/profiles';

import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MenuDropdown({ open, onClose }: Props) {
  const navigate = useNavigate();
  const token = getToken();
  const username = getUsername();
  const loggedIn = Boolean(token);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (!loggedIn || !username) {
      setProfile(null);
      return;
    }

    if (profile) return;

    (async () => {
      setIsLoadingProfile(true);
      try {
        const data = await getProfile(username);
        setProfile(data);
      } catch {
        console.log('Something went wrong.');
      } finally {
        setIsLoadingProfile(false);
      }
    })();
  }, [open, loggedIn, username]);

  if (!open) return null;

  function handleLogout() {
    clearAuthStorage();
    onClose();
    navigate('/');
  }

  return (
    <div
      className="absolute right-4 top-[74px] z-50 rounded-2xl border-2 border-[#F5F6F7] bg-white text-secondary shadow-lg sm:right-0 sm:top-[66px]"
      aria-label="User menu"
    >
      {!loggedIn ? (
        <div className="flex flex-col py-3">
          <Link
            to="/login"
            onClick={onClose}
            className="flex items-center gap-2 py-2 pl-4 pr-10 hover:bg-[#F5F6F7]"
          >
            <ExitToAppOutlinedIcon fontSize="small" />
            <p>Log in</p>
          </Link>
          <Link
            to="/register"
            onClick={onClose}
            className="flex items-center gap-2 py-2 pl-4 pr-10 hover:bg-[#F5F6F7]"
          >
            <AddBoxOutlinedIcon fontSize="small" />
            <p>Sign up</p>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col py-3">
          <Link
            to="/profile"
            onClick={onClose}
            className="flex items-center gap-2 py-2 pl-4 pr-10 hover:bg-[#F5F6F7]"
          >
            <PersonOutlineOutlinedIcon fontSize="small" />
            <p>Profile</p>
          </Link>
          <Link
            to="/bookings"
            onClick={onClose}
            className="flex items-center gap-2 py-2 pl-4 pr-10 hover:bg-[#F5F6F7]"
          >
            <CalendarMonthOutlinedIcon fontSize="small" />
            <p>My bookings</p>
          </Link>

          {!isLoadingProfile && profile?.venueManager && (
            <Link
              to="/manager/venues"
              onClick={onClose}
              className="flex items-center gap-2 py-2 pl-4 pr-10 hover:bg-[#F5F6F7]"
            >
              <CottageOutlinedIcon fontSize="small" />
              <p>My venues</p>
            </Link>
          )}

          <div className="h-px bg-[#F5F6F7]" />

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 py-2 pl-4 pr-10 hover:bg-[#F5F6F7]"
          >
            <MeetingRoomOutlinedIcon fontSize="small" />
            <p>Log out</p>
          </button>
        </div>
      )}
    </div>
  );
}
