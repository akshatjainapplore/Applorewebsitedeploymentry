const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit & { token?: string } = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}/api/v1${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `API Error: ${res.status}`);
  }

  return data;
}

export async function apiUpload(file: File, token: string) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_URL}/api/v1/media/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Upload failed');
  return data;
}
