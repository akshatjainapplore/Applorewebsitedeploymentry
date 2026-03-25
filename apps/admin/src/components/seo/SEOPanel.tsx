'use client';

import type { SEOData } from '@applore/types';

interface SEOPanelProps {
  seo: Partial<SEOData>;
  onChange: (seo: Partial<SEOData>) => void;
  title?: string;
}

function calculateSEOScore(seo: Partial<SEOData>, title: string): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 0;

  if (seo.metaTitle) { score += 20; } else { issues.push('Missing meta title'); }
  if (seo.metaDescription) {
    score += 20;
    if (seo.metaDescription.length < 120) issues.push('Meta description too short (< 120 chars)');
    if (seo.metaDescription.length > 160) issues.push('Meta description too long (> 160 chars)');
  } else { issues.push('Missing meta description'); }
  if (seo.ogTitle) score += 15;
  if (seo.ogDescription) score += 15;
  if (seo.ogImage) score += 15;
  if (seo.robots) score += 15;

  return { score, issues };
}

export default function SEOPanel({ seo, onChange, title }: SEOPanelProps) {
  const { score, issues } = calculateSEOScore(seo, title || '');

  const update = (key: keyof SEOData, value: string) => onChange({ ...seo, [key]: value });

  const scoreColor = score >= 80 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600';
  const scoreBarColor = score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="space-y-4">
      {/* SEO Score */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">SEO Score</h3>
          <span className={`text-2xl font-bold ${scoreColor}`}>{score}/100</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <div
            className={`h-2 rounded-full transition-all ${scoreBarColor}`}
            style={{ width: `${score}%` }}
          />
        </div>
        {issues.length > 0 && (
          <ul className="space-y-1">
            {issues.map((issue, i) => (
              <li key={i} className="text-xs text-yellow-700 flex items-center gap-1.5">
                <span>⚠️</span> {issue}
              </li>
            ))}
          </ul>
        )}
        {issues.length === 0 && (
          <p className="text-xs text-green-600">✅ SEO looks great!</p>
        )}
      </div>

      {/* Meta */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <h3 className="font-semibold">Meta Tags</h3>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Meta Title <span className="text-muted-foreground font-normal">({(seo.metaTitle || '').length}/60)</span>
          </label>
          <input
            type="text"
            value={seo.metaTitle || ''}
            onChange={(e) => update('metaTitle', e.target.value)}
            className="field-input"
            placeholder="Page title for search engines"
            maxLength={60}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Meta Description <span className="text-muted-foreground font-normal">({(seo.metaDescription || '').length}/160)</span>
          </label>
          <textarea
            value={seo.metaDescription || ''}
            onChange={(e) => update('metaDescription', e.target.value)}
            className="field-input"
            rows={3}
            placeholder="Brief description for search results..."
            maxLength={160}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Canonical URL</label>
          <input
            type="text"
            value={seo.canonicalUrl || ''}
            onChange={(e) => update('canonicalUrl', e.target.value)}
            className="field-input"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Robots</label>
          <select
            value={seo.robots || 'index,follow'}
            onChange={(e) => update('robots', e.target.value)}
            className="field-input"
          >
            <option value="index,follow">index, follow</option>
            <option value="noindex,follow">noindex, follow</option>
            <option value="index,nofollow">index, nofollow</option>
            <option value="noindex,nofollow">noindex, nofollow</option>
          </select>
        </div>
      </div>

      {/* Open Graph */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <h3 className="font-semibold">Open Graph (Facebook / LinkedIn)</h3>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">OG Title</label>
          <input
            type="text"
            value={seo.ogTitle || ''}
            onChange={(e) => update('ogTitle', e.target.value)}
            className="field-input"
            placeholder="Leave empty to use meta title"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">OG Description</label>
          <textarea
            value={seo.ogDescription || ''}
            onChange={(e) => update('ogDescription', e.target.value)}
            className="field-input"
            rows={2}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">OG Image URL</label>
          <input
            type="text"
            value={seo.ogImage || ''}
            onChange={(e) => update('ogImage', e.target.value)}
            className="field-input"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Twitter Card */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <h3 className="font-semibold">Twitter Card</h3>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Twitter Title</label>
          <input
            type="text"
            value={seo.twitterTitle || ''}
            onChange={(e) => update('twitterTitle', e.target.value)}
            className="field-input"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Twitter Description</label>
          <textarea
            value={seo.twitterDescription || ''}
            onChange={(e) => update('twitterDescription', e.target.value)}
            className="field-input"
            rows={2}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Twitter Image URL</label>
          <input
            type="text"
            value={seo.twitterImage || ''}
            onChange={(e) => update('twitterImage', e.target.value)}
            className="field-input"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* JSON-LD */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <h3 className="font-semibold">Structured Data (JSON-LD)</h3>
        <textarea
          value={seo.jsonLd || ''}
          onChange={(e) => update('jsonLd', e.target.value)}
          className="field-input font-mono text-xs"
          rows={6}
          placeholder='{"@context": "https://schema.org", "@type": "WebPage", ...}'
        />
      </div>
    </div>
  );
}
