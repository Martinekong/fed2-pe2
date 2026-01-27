export const STORAGE_KEYS = {
  token: 'holidaze_token',
  username: 'holidaze_username',
  favorites: 'holidaze_favorites',
};

export function getToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.token);
}

export function setToken(token: string): void {
  localStorage.setItem(STORAGE_KEYS.token, token);
}

export function clearToken(): void {
  localStorage.removeItem(STORAGE_KEYS.token);
}

export function getUsername(): string | null {
  return localStorage.getItem(STORAGE_KEYS.username);
}

export function setUsername(username: string): void {
  localStorage.setItem(STORAGE_KEYS.username, username);
}

export function clearUsername(): void {
  localStorage.removeItem(STORAGE_KEYS.username);
}

export function clearAuthStorage(): void {
  clearToken();
  clearUsername();
}

export function getFavorites(): string[] {
  const favorites = localStorage.getItem(STORAGE_KEYS.favorites);
  if (!favorites) return [];
  try {
    const parsed = JSON.parse(favorites);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function setFavorites(ids: string[]): void {
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(ids));
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}

export function addFavorite(id: string): void {
  const favorites = getFavorites();
  if (favorites.includes(id)) return;
  setFavorites([...favorites, id]);
}

export function removeFavorite(id: string): void {
  const favorites = getFavorites().filter((x) => x !== id);
  setFavorites(favorites);
}

export function toggleFavorite(id: string): boolean {
  const favorites = getFavorites();
  const exists = favorites.includes(id);

  const updated = exists
    ? favorites.filter((x) => x !== id)
    : [...favorites, id];
  setFavorites(updated);
  return !exists;
}
