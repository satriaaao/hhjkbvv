export const SUPABASE_URL = "https://xleceiffuopioeguniwj.supabase.co";
export const SUPABASE_KEY = "sb_publishable_POksYryhG_mkFbs7N0fjKQ_4dUim7Ex";

type CmsSession = {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  user?: { id: string; email?: string };
};

const publicHeaders = {
  apikey: SUPABASE_KEY,
  "Content-Type": "application/json",
};

export async function cmsPublicGet<T>(table: string, query = ""): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query ? `?${query}` : ""}`, {
    headers: publicHeaders,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function cmsSignIn(email: string, password: string): Promise<CmsSession> {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: publicHeaders,
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Email atau password tidak cocok.");
  const session = await res.json();
  if (typeof window !== "undefined") localStorage.setItem("aiorbitlab_cms_session", JSON.stringify(session));
  return session;
}

export function cmsGetSession(): CmsSession | null {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem("aiorbitlab_cms_session");
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function cmsSignOut() {
  if (typeof window !== "undefined") localStorage.removeItem("aiorbitlab_cms_session");
}

export async function cmsAuthed<T = unknown>(
  table: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  session: CmsSession,
  query = "",
  body?: unknown,
  prefer = "return=representation"
): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query ? `?${query}` : ""}`, {
    method,
    headers: {
      ...publicHeaders,
      Authorization: `Bearer ${session.access_token}`,
      Prefer: prefer,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  if (res.status === 204) return undefined as T;
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export async function cmsUploadImage(file: File, session: CmsSession): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const clean = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${clean || `image.${ext}`}`;
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/cms-media/${encodeURIComponent(path)}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": file.type || "image/jpeg",
      "x-upsert": "false",
    },
    body: file,
  });
  if (!res.ok) throw new Error(await res.text());
  return `${SUPABASE_URL}/storage/v1/object/public/cms-media/${encodeURIComponent(path)}`;
}
