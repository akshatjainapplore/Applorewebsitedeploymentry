import Link from 'next/link';
import type { MenuItem, SocialLinks } from '@applore/types';

interface FooterProps {
  settings: {
    siteTitle?: string;
    tagline?: string;
    socialLinks?: SocialLinks;
  } | null;
  menu: {
    items: MenuItem[];
  } | null;
}

export default function Footer({ settings, menu }: FooterProps) {
  const items = menu?.items || [];
  const socialLinks = settings?.socialLinks || {};
  const year = new Date().getFullYear();

  // Split items into columns
  const col1 = items.slice(0, Math.ceil(items.length / 2));
  const col2 = items.slice(Math.ceil(items.length / 2));

  return (
    <footer style={{ backgroundColor: '#242424', color: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Main footer content */}
      <div className="max-w-[1440px] mx-auto px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <span
                className="text-2xl font-bold text-white tracking-tight"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {settings?.siteTitle || 'Applore'}
              </span>
            </div>
            {settings?.tagline && (
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: 'rgba(248,246,241,0.6)', fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 300 }}
              >
                {settings.tagline}
              </p>
            )}
            {/* Social links */}
            {Object.keys(socialLinks).length > 0 && (
              <div className="flex gap-3 mt-4">
                {socialLinks.twitter && (
                  <SocialLink href={socialLinks.twitter} label="Twitter">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </SocialLink>
                )}
                {socialLinks.linkedin && (
                  <SocialLink href={socialLinks.linkedin} label="LinkedIn">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </SocialLink>
                )}
                {socialLinks.github && (
                  <SocialLink href={socialLinks.github} label="GitHub">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </SocialLink>
                )}
              </div>
            )}
          </div>

          {/* Social Media column */}
          <div>
            <h4
              className="text-base font-bold uppercase tracking-widest mb-6"
              style={{ color: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Social Media
            </h4>
            <ul className="space-y-3">
              {socialLinks.linkedin && (
                <li>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: 'rgba(248,246,241,0.6)', fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 300 }}
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              {socialLinks.twitter && (
                <li>
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: 'rgba(248,246,241,0.6)', fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 300 }}
                  >
                    Twitter / X
                  </a>
                </li>
              )}
              {socialLinks.github && (
                <li>
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: 'rgba(248,246,241,0.6)', fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 300 }}
                  >
                    GitHub
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Navigation column 1 */}
          {col1.length > 0 && (
            <div>
              <h4
                className="text-base font-bold uppercase tracking-widest mb-6"
                style={{ color: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Contact Us
              </h4>
              <ul className="space-y-3">
                {col1.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.url || '#'}
                      target={item.target || '_self'}
                      className="text-sm hover:text-white transition-colors"
                      style={{ color: 'rgba(248,246,241,0.6)', fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 300 }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation column 2 */}
          {col2.length > 0 && (
            <div>
              <h4
                className="text-base font-bold uppercase tracking-widest mb-6"
                style={{ color: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Quick Links
              </h4>
              <ul className="space-y-3">
                {col2.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.url || '#'}
                      target={item.target || '_self'}
                      className="text-sm hover:text-white transition-colors"
                      style={{ color: 'rgba(248,246,241,0.6)', fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 300 }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(248,246,241,0.1)' }}
      >
        <div className="max-w-[1440px] mx-auto px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-sm"
            style={{ color: 'rgba(248,246,241,0.6)', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
          >
            Copyright &copy; {year} {settings?.siteTitle || 'Applore'} Technologies | All Rights Reserved
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-sm hover:text-white transition-colors"
              style={{ color: 'rgba(248,246,241,0.6)', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/privacy"
              className="text-sm hover:text-white transition-colors"
              style={{ color: 'rgba(248,246,241,0.6)', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
      style={{
        backgroundColor: 'rgba(248,246,241,0.1)',
        color: 'rgba(248,246,241,0.6)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(248,246,241,0.2)';
        (e.currentTarget as HTMLElement).style.color = '#ffffff';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(248,246,241,0.1)';
        (e.currentTarget as HTMLElement).style.color = 'rgba(248,246,241,0.6)';
      }}
    >
      {children}
    </a>
  );
}
