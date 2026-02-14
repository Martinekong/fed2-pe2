import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/authContext';
import toast from 'react-hot-toast';

import { updateProfile } from '../../api/profiles';

import Button from '../../components/ui/Button';
import Textarea from '../../components/ui/Textarea';
import LoadingLine from '../../components/ui/LoadingLine';
import SafeImage from '../../components/ui/SafeImage';
import AvatarModal from '../../components/profile/AvatarModal';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function EditProfilePage() {
  const navigate = useNavigate();

  const { username, profile, isLoadingProfile, setProfile } = useAuth();

  const [bio, setBio] = useState('');
  const [venueManager, setVenueManager] = useState(false);

  const [avatarOpen, setAvatarOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarAlt, setAvatarAlt] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [isSavingAvatar, setIsSavingAvatar] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setBio(profile.bio ?? '');
    setVenueManager(Boolean(profile.venueManager));
    setAvatarUrl(profile.avatar?.url ?? '');
    setAvatarAlt(profile.avatar?.alt ?? '');
  }, [profile]);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!username) return;

    setIsSaving(true);

    try {
      const updated = await updateProfile(username, {
        bio: bio.trim(),
        venueManager,
      });

      setProfile(updated);
      toast.success('Your profile has been updated!');
      navigate('/profile');
    } catch {
      toast.error('Could not update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSaveAvatar() {
    if (!username) return;

    const url = avatarUrl.trim();
    const alt = avatarAlt.trim();

    if (!url) {
      toast.error('Please add an image url.');
      return;
    }

    setIsSavingAvatar(true);

    try {
      const updated = await updateProfile(username, { avatar: { url, alt } });

      setProfile(updated);
      toast.success('Profile image updated!');
      setAvatarOpen(false);
    } catch {
      toast.error('Could not update profile image. Please try again.');
    } finally {
      setIsSavingAvatar(false);
    }
  }

  return (
    <div className="page-wrapper gap-8">
      <h1>Edit Profile</h1>

      {isLoadingProfile && <LoadingLine text="Getting your profile..." />}

      {!isLoadingProfile && !username && (
        <p className="text-error">Please log in to edit your profile.</p>
      )}

      {!isLoadingProfile && username && !profile && (
        <p className="text-error">Profile not found. Please log in again.</p>
      )}

      {!isLoadingProfile && profile && (
        <>
          <div className="flex flex-wrap gap-8">
            <div className="relative">
              <SafeImage
                src={profile.avatar.url}
                alt={profile.avatar.alt || `${profile.name}'s avatar`}
                className="h-48 w-48 rounded-full object-cover"
              />
              <button
                type="button"
                onClick={() => setAvatarOpen(true)}
                aria-label="Edit profile image"
                className="absolute right-2 top-2 h-12 w-12 rounded-full bg-primary text-white shadow-md hover:bg-primary_hover hover:shadow-lg"
                disabled={isSaving || isSavingAvatar}
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
                disabled={isSaving || isSavingAvatar}
              />
            </div>

            <label className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setVenueManager((v) => !v)}
                aria-pressed={venueManager}
                className={`relative h-10 w-20 rounded-full shadow-md transition duration-300 hover:shadow-lg ${venueManager ? 'bg-primary' : 'bg-[#918C8C]'}`}
                disabled={isSaving || isSavingAvatar}
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
                disabled={isSaving || isSavingAvatar}
                className="w-48"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </Button>

              <Link to={'/profile'}>
                <Button
                  variant="secondary"
                  type="button"
                  className="w-48"
                  disabled={isSaving || isSavingAvatar}
                >
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
        </>
      )}
    </div>
  );
}
