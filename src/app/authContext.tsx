import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  getToken,
  getUsername,
  clearAuthStorage,
  setToken,
  setUsername,
} from '../lib/storage';
import { getProfile, type Profile } from '../api/profiles';
import toast from 'react-hot-toast';

type AuthState = {
  token: string | null;
  username: string | null;
  profile: Profile | null;
  isLoadingProfile: boolean;
};

type AuthContextValue = AuthState & {
  loggedIn: boolean;
  isVenueManager: boolean;
  refreshProfile: () => Promise<void>;
  logout: () => void;
  setAuth: (next: { token: string; username: string }) => void;
  setProfile: (next: Profile | null) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => getToken());
  const [username, setUsernameState] = useState<string | null>(() =>
    getUsername(),
  );

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  const loggedIn = Boolean(token);
  const isVenueManager = Boolean(profile?.venueManager);

  async function refreshProfile() {
    if (!token || !username) {
      setProfile(null);
      return;
    }
    setIsLoadingProfile(true);
    try {
      const p = await getProfile(username);
      setProfile(p);
    } finally {
      setIsLoadingProfile(false);
    }
  }

  function setAuth(next: { token: string; username: string }) {
    setToken(next.token);
    setUsername(next.username);

    setTokenState(next.token);
    setUsernameState(next.username);
  }

  function logout() {
    toast.success(`Goodbye for now ${profile?.name}!`);
    clearAuthStorage();
    setTokenState(null);
    setUsernameState(null);
    setProfile(null);
  }

  useEffect(() => {
    if (loggedIn) refreshProfile();
  }, [loggedIn]);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      username,
      profile,
      isLoadingProfile,
      loggedIn,
      isVenueManager,
      refreshProfile,
      logout,
      setAuth,
      setProfile,
    }),
    [token, username, profile, isLoadingProfile, loggedIn, isVenueManager],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
