'use client';

import { useState } from 'react';
import { toast } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface Settings {
  id: string;
  siteTitle: string;
  tagline?: string;
  logoUrl?: string;
  faviconUrl?: string;
  analyticsId?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    github?: string;
  };
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpSecure?: boolean;
}

export default function SettingsForm({
  settings: initial,
  token,
}: {
  settings: Settings | null;
  token: string;
}) {
  const [siteTitle, setSiteTitle] = useState(initial?.siteTitle || '');
  const [tagline, setTagline] = useState(initial?.tagline || '');
  const [logoUrl, setLogoUrl] = useState(initial?.logoUrl || '');
  const [faviconUrl, setFaviconUrl] = useState(initial?.faviconUrl || '');
  const [analyticsId, setAnalyticsId] = useState(initial?.analyticsId || '');
  const [social, setSocial] = useState(initial?.socialLinks || {});
  const [smtpHost, setSmtpHost] = useState(initial?.smtpHost || '');
  const [smtpPort, setSmtpPort] = useState(initial?.smtpPort || 587);
  const [smtpUser, setSmtpUser] = useState(initial?.smtpUser || '');
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'social' | 'smtp'>('general');

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          siteTitle,
          tagline,
          logoUrl,
          faviconUrl,
          analyticsId,
          socialLinks: social,
          smtpHost,
          smtpPort: Number(smtpPort),
          smtpUser,
        }),
      });
      if (!res.ok) throw new Error('Failed to save');
      toast.success('Settings saved');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  }

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'social', label: 'Social Media' },
    { id: 'smtp', label: 'SMTP Email' },
  ] as const;

  return (
    <div className="max-w-2xl">
      <div className="flex border-b border-border gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        {activeTab === 'general' && (
          <div className="space-y-4">
            <h3 className="font-semibold mb-4">Site Information</h3>
            <Field label="Site Title">
              <input type="text" value={siteTitle} onChange={(e) => setSiteTitle(e.target.value)} className="field-input" />
            </Field>
            <Field label="Tagline">
              <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} className="field-input" placeholder="Short description of your site" />
            </Field>
            <Field label="Logo URL">
              <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className="field-input" placeholder="https://..." />
            </Field>
            <Field label="Favicon URL">
              <input type="text" value={faviconUrl} onChange={(e) => setFaviconUrl(e.target.value)} className="field-input" placeholder="https://..." />
            </Field>
            <Field label="Google Analytics ID (GA4)">
              <input type="text" value={analyticsId} onChange={(e) => setAnalyticsId(e.target.value)} className="field-input" placeholder="G-XXXXXXXXXX" />
            </Field>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-4">
            <h3 className="font-semibold mb-4">Social Media Links</h3>
            {(['twitter', 'facebook', 'instagram', 'linkedin', 'youtube', 'github'] as const).map((platform) => (
              <Field key={platform} label={platform.charAt(0).toUpperCase() + platform.slice(1)}>
                <input
                  type="url"
                  value={(social as Record<string, string>)[platform] || ''}
                  onChange={(e) => setSocial((prev) => ({ ...prev, [platform]: e.target.value }))}
                  className="field-input"
                  placeholder={`https://${platform}.com/yourprofile`}
                />
              </Field>
            ))}
          </div>
        )}

        {activeTab === 'smtp' && (
          <div className="space-y-4">
            <h3 className="font-semibold mb-4">SMTP Email Settings</h3>
            <Field label="SMTP Host">
              <input type="text" value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} className="field-input" placeholder="smtp.gmail.com" />
            </Field>
            <Field label="SMTP Port">
              <input type="number" value={smtpPort} onChange={(e) => setSmtpPort(Number(e.target.value))} className="field-input" />
            </Field>
            <Field label="SMTP Username">
              <input type="text" value={smtpUser} onChange={(e) => setSmtpUser(e.target.value)} className="field-input" placeholder="your@email.com" />
            </Field>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-border">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="h-9 px-6 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">{label}</label>
      {children}
    </div>
  );
}
