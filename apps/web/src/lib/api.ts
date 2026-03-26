const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface FetchOptions extends RequestInit {
  revalidate?: number | false;
  tags?: string[];
}

async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate = 60, tags, ...fetchOptions } = options;

  const url = `${API_URL}/api/v1${endpoint}`;

  const response = await fetch(url, {
    ...fetchOptions,
    signal: AbortSignal.timeout(5000),
    next: {
      revalidate: revalidate === false ? 0 : revalidate,
      tags,
    },
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Pages API
export async function getPages() {
  try {
    const res = await apiFetch<{ data: unknown[] }>('/pages?status=PUBLISHED', {
      revalidate: 60,
      tags: ['pages'],
    });
    return res.data;
  } catch {
    return [];
  }
}

export async function getPageBySlug(slug: string) {
  try {
    const res = await apiFetch<{ data: unknown }>(`/pages/slug/${slug}`, {
      revalidate: 60,
      tags: [`page-${slug}`],
    });
    return res.data;
  } catch {
    return null;
  }
}

// Posts API
export async function getPosts(params?: {
  page?: number;
  limit?: number;
  categoryId?: string;
  tagId?: string;
  search?: string;
}) {
  try {
    const query = new URLSearchParams({
      status: 'PUBLISHED',
      page: String(params?.page || 1),
      limit: String(params?.limit || 10),
      ...(params?.categoryId && { categoryId: params.categoryId }),
      ...(params?.tagId && { tagId: params.tagId }),
      ...(params?.search && { search: params.search }),
    });
    const res = await apiFetch<{
      data: unknown[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    }>(`/posts?${query}`, {
      revalidate: 60,
      tags: ['posts'],
    });
    return res;
  } catch {
    return { data: [], total: 0, page: 1, limit: 10, totalPages: 0 };
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const res = await apiFetch<{ data: unknown }>(`/posts/slug/${slug}`, {
      revalidate: 60,
      tags: [`post-${slug}`],
    });
    return res.data;
  } catch {
    return null;
  }
}

// Menus API
export async function getMenuByLocation(location: 'HEADER' | 'FOOTER') {
  try {
    const res = await apiFetch<{ data: unknown }>(`/menus/location/${location}`, {
      revalidate: 300,
      tags: [`menu-${location}`],
    });
    return res.data;
  } catch {
    const { MOCK_HEADER_MENU, MOCK_FOOTER_MENU } = await import('./mock-data');
    return location === 'HEADER' ? MOCK_HEADER_MENU : MOCK_FOOTER_MENU;
  }
}

// Settings API
export async function getSiteSettings() {
  try {
    const res = await apiFetch<{ data: unknown }>('/settings', {
      revalidate: 300,
      tags: ['settings'],
    });
    return res.data;
  } catch {
    const { MOCK_SITE_SETTINGS } = await import('./mock-data');
    return MOCK_SITE_SETTINGS;
  }
}

// Categories API
export async function getCategories() {
  try {
    const res = await apiFetch<{ data: unknown[] }>('/categories', {
      revalidate: 300,
      tags: ['categories'],
    });
    return res.data;
  } catch {
    return [];
  }
}

// SEO sitemap data
export async function getSitemapData() {
  try {
    const res = await apiFetch<{ data: { pages: unknown[]; posts: unknown[] } }>('/seo/sitemap', {
      revalidate: 3600,
    });
    return res.data;
  } catch {
    return { pages: [], posts: [] };
  }
}
