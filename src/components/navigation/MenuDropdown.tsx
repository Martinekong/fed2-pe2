import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../app/authContext';

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
  const { loggedIn, isVenueManager, logout } = useAuth();

  if (!open) return null;

  function handleLogout() {
    logout();
    onClose();
    navigate('/');
  }

  return (
    <div
      className="absolute right-4 top-[74px] z-50 rounded-2xl border-2 border-black/5 bg-white text-tertiary shadow-xl sm:right-0 sm:top-[66px]"
      aria-label="User menu"
    >
      {!loggedIn ? (
        <div className="flex flex-col py-3">
          <Link
            to="/login"
            onClick={onClose}
            className="flex items-center gap-2 py-2 pl-4 pr-10 hover:bg-secondary/30"
          >
            <ExitToAppOutlinedIcon fontSize="small" />
            <p>Log in</p>
          </Link>
          <Link
            to="/register"
            onClick={onClose}
            className="flex items-center gap-2 py-2 pl-4 pr-10 hover:bg-secondary/30"
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
            className="flex items-center gap-2 py-2 pl-4 pr-10 hover:bg-secondary/30"
          >
            <PersonOutlineOutlinedIcon fontSize="small" />
            <p>Profile</p>
          </Link>
          <Link
            to="/bookings"
            onClick={onClose}
            className="flex items-center gap-2 py-2 pl-4 pr-10 hover:bg-secondary/30"
          >
            <CalendarMonthOutlinedIcon fontSize="small" />
            <p>My bookings</p>
          </Link>

          {isVenueManager && (
            <Link
              to="/manager/venues"
              onClick={onClose}
              className="flex items-center gap-2 py-2 pl-4 pr-10 hover:bg-secondary/30"
            >
              <CottageOutlinedIcon fontSize="small" />
              <p>My venues</p>
            </Link>
          )}

          <div className="h-px bg-[#F5F6F7]" />

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 py-2 pl-4 pr-10 hover:bg-secondary/30"
          >
            <MeetingRoomOutlinedIcon fontSize="small" />
            <p>Log out</p>
          </button>
        </div>
      )}
    </div>
  );
}
