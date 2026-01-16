export const STORAGE_KEYS = {
    token: "holidaze_token",
    username: "holidaze_username",
    favorites: "holidaze_favorites"
}

export function getToken() : string | null {
    return localStorage.getItem(STORAGE_KEYS.token)
}

export function setToken(token : string) : void {
    localStorage.setItem(STORAGE_KEYS.token, token)
}

export function clearToken() : void {
    localStorage.removeItem(STORAGE_KEYS.token)
}

export function getUsername() : string | null {
    return localStorage.getItem(STORAGE_KEYS.username)
}

export function setUsername(username : string) : void {
    localStorage.setItem(STORAGE_KEYS.username, username)
}

export function clearUsername() : void {
    localStorage.removeItem(STORAGE_KEYS.username)
}

export function clearAuthStorage() : void {
    clearToken();
    clearUsername();
}

// Add functions for favorites storage functionality here later