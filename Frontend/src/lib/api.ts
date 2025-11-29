export type LoginPayload = { email: string; password: string };
export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  cc?: string | null;
  url_photo?: string | null;
};

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5000";
const API_KEY = import.meta.env.VITE_API_KEY ?? "111"; // default aligns with backend .env

export async function apiLogin(payload: LoginPayload) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Login failed (${res.status})`);
  }
  return res.json() as Promise<{ access_token: string }>; // Nest usually returns access_token
}

export async function apiRegister(payload: RegisterPayload) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Register failed (${res.status})`);
  }
  return res.json();
}

export function authHeaders(token?: string) {
  return {
    "X-API-Key": API_KEY,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  } as Record<string, string>;
}

export async function apiGet(path: string, token?: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: authHeaders(token),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `GET ${path} failed (${res.status})`);
  }
  return res.json();
}

export async function apiPost(path: string, body: unknown, token?: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `POST ${path} failed (${res.status})`);
  }
  return res.json();
}

export async function apiPatch(path: string, body: unknown, token?: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `PATCH ${path} failed (${res.status})`);
  }
  return res.json();
}

export async function apiDelete(path: string, token?: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `DELETE ${path} failed (${res.status})`);
  }
  return res.json();
}

// NASA endpoints (public, no auth required per backend)
export async function getNasaMarsWeather() {
  const res = await fetch(`${API_BASE}/nasa/mars-weather`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `NASA weather failed (${res.status})`);
  }
  return res.json();
}

export async function getNasaRoverPhotos(rover: 'curiosity' | 'perseverance' = 'curiosity') {
  const res = await fetch(`${API_BASE}/nasa/rover-photos?rover=${rover}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `NASA rover photos failed (${res.status})`);
  }
  return res.json();
}

// Maps endpoints (JWT + API-key)
export async function getMaps(token?: string) {
  return apiGet('/maps', token);
}

export async function getMap(id: string, token?: string) {
  return apiGet(`/maps/${id}`, token);
}

// Vehicle types
export async function getVehicleTypes(token?: string) {
  return apiGet('/vehicle-type', token);
}
