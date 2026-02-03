import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import Button from '../../components/ui/Button';
import Textarea from '../../components/ui/Textarea';

import { getUsername } from '../../lib/storage';
import { getProfile, updateProfile, type Profile } from '../../api/profiles';

import AvatarModal from '../../components/profile/AvatarModal';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const username = getUsername();

  const [profile, setProfile] = useState<Profile | null>(null);

  const [bio, setBio] = useState('');
  const [venueManager, setVenueManager] = useState(false);

  const [avatarOpen, setAvatarOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarAlt, setAvatarAlt] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingAvatar, setIsSavingAvatar] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        if (!username) {
          setError('Missing username. Please log in again.');
          return;
        }

        const data = await getProfile(username);
        setProfile(data);

        setBio(data.bio ?? '');
        setVenueManager(Boolean(data.venueManager));

        setAvatarUrl(data.avatar.url ?? '');
        setAvatarAlt(data.avatar.alt ?? '');
      } catch {
        setError('Could not load profile.');
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [username]);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!username) return;

    setIsSaving(true);
    setError(null);

    try {
      const updated = await updateProfile(username, {
        bio: bio.trim(),
        venueManager,
      });

      setProfile(updated);
      toast.success('Profile updated!');
      navigate('/profile');
    } catch {
      setError('Could not update profile.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSaveAvatar() {
    if (!username) return;

    const url = avatarUrl.trim();
    const alt = avatarAlt.trim();

    if (!url) {
      // NØDVENDIG?
      toast.error('Please add an image url.');
    }

    setIsSavingAvatar(true);
    setError(null);

    try {
      const updated = await updateProfile(username, { avatar: { url, alt } });

      setProfile(updated);
      toast.success('Profile image updated!');
      setAvatarOpen(false);
    } catch {
      toast.error('Could not update profile image.');
    } finally {
      setIsSavingAvatar(false);
    }
  }

  if (isLoading) return <div className="page-wrapper">Loading...</div>;
  if (error) return <div className="page-wrapper text-error">{error}</div>;
  if (!profile) return <div className="page-wrapper">Profile not found</div>;

  return (
    <div className="page-wrapper gap-8">
      <h1>Edit Profile</h1>

      <div className="flex flex-wrap gap-8">
        <div className="relative">
          <img
            src={profile.avatar.url}
            alt={profile.avatar.alt}
            className="h-48 w-48 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={() => setAvatarOpen(true)}
            aria-label="Edit profile image"
            className="absolute right-2 top-2 h-12 w-12 rounded-full bg-primary text-white shadow-md hover:bg-primary_hover hover:shadow-lg"
          >
            <EditOutlinedIcon />
          </button>
        </div>

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

      <form onSubmit={handleSaveProfile} className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3>About me:</h3>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
            className="min-h-[120px]"
          />
        </div>

        <label className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setVenueManager((v) => !v)}
            aria-pressed={venueManager}
            className={`relative h-10 w-20 rounded-full shadow-md transition duration-300 hover:shadow-lg ${venueManager ? 'bg-primary' : 'bg-tertiary'}`}
          >
            <span
              className={`absolute top-1 h-8 w-8 rounded-full bg-white transition duration-300 ${venueManager ? 'left-11' : 'left-1'}`}
            />
          </button>
          <span>Register as a venue manager</span>
        </label>

        <div className="flex flex-wrap gap-4">
          <Button
            variant="primary"
            type="submit"
            disabled={isSaving}
            className="w-48"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>

          <Link to={'/profile'}>
            <Button variant="secondary" type="button" className="w-48">
              Cancel
            </Button>
          </Link>
        </div>
      </form>

      <AvatarModal
        open={avatarOpen}
        isSaving={isSavingAvatar}
        url={avatarUrl}
        alt={avatarAlt}
        onChangeUrl={setAvatarUrl}
        onChangeAlt={setAvatarAlt}
        onClose={() => setAvatarOpen(false)}
        onSave={handleSaveAvatar}
      />
    </div>
  );
}
