'use client';

import Link from 'next/link';

interface FooterProps {
  settings: any;
  menu: any;
}

function FooterLogo() {
  return (
    <svg width="140" height="40" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="16,4 30,36 2,36" fill="#60A5FA" />
      <polygon points="16,4 30,36 16,22" fill="#A78BFA" opacity="0.8" />
      <text x="38" y="28" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="18" letterSpacing="3" fill="#F9FAFB">APPLORE</text>
    </svg>
  );
}

const colHeadingStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'rgba(255,255,255,0.35)',
  marginBottom: '20px',
};

const linkStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '14px',
  color: 'rgba(255,255,255,0.5)',
  textDecoration: 'none',
  marginBottom: '12px',
  transition: 'color 0.2s',
};

const addressTextStyle: React.CSSProperties = {
  fontSize: '14px',
  color: 'rgba(255,255,255,0.4)',
  lineHeight: '22px',
  margin: 0,
};

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={linkStyle}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#ffffff')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)')}
    >
      {children}
    </Link>
  );
}

export default function Footer({ settings: _settings, menu: _menu }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#0D0D0D', color: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 32px 0' }}>

        {/* Hero tagline section */}
        <div style={{ marginBottom: '56px' }}>
          <p style={{
            fontSize: '48px',
            fontWeight: 800,
            lineHeight: 1.15,
            margin: 0,
            color: '#ffffff',
            letterSpacing: '-0.02em',
          }}>
            Before automation
          </p>
          <p style={{
            fontSize: '48px',
            fontWeight: 800,
            lineHeight: 1.15,
            margin: '4px 0 0',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '-0.02em',
          }}>
            there&apos;s clarity.
          </p>
        </div>

        {/* Horizontal divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '48px' }} />

        {/* Logo + nav links row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '56px' }}>
          <FooterLogo />
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
            {[
              { label: 'Home', href: '/' },
              { label: 'About Us', href: '/about' },
              { label: 'Our Work', href: '/work' },
              { label: 'Our Expertise', href: '/services' },
              { label: 'Insights', href: '/insights' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#ffffff')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)')}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* 4-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px',
          paddingBottom: '56px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          {/* Column 1: Company */}
          <div>
            <div style={colHeadingStyle}>Company</div>
            <FooterLink href="/about">Company Overview</FooterLink>
            <FooterLink href="/product">Product</FooterLink>
            <FooterLink href="/insights">Blogs</FooterLink>
            <FooterLink href="/contact#demo">Book A Demo</FooterLink>
            <FooterLink href="/careers">Career</FooterLink>
          </div>

          {/* Column 2: Services */}
          <div>
            <div style={colHeadingStyle}>Services</div>
            <FooterLink href="/services/real-estate">Real Estate</FooterLink>
            <FooterLink href="/services/travel-tourism">Travel and Tourism</FooterLink>
            <FooterLink href="/services/bfsi">BFSI</FooterLink>
            <FooterLink href="/services/education">Education (EdTech)</FooterLink>
            <FooterLink href="/services/healthcare">Healthcare</FooterLink>
          </div>

          {/* Column 3: Global Presence */}
          <div>
            <div style={colHeadingStyle}>Global Presence</div>
            <p style={addressTextStyle}>803, Pegasus Tower,</p>
            <p style={addressTextStyle}>Block A, Sector 68,</p>
            <p style={addressTextStyle}>Noida, Uttar Pradesh</p>
            <p style={{ ...addressTextStyle, marginTop: '2px' }}>– 201307, India</p>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <div style={colHeadingStyle}>Contact Us</div>
            <a
              href="mailto:hello@applore.in"
              style={{ ...linkStyle, marginBottom: '24px' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#ffffff')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)')}
            >
              hello@applore.in
            </a>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/applorein"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.12)';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)';
                }}
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com/applorein"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.12)';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)';
                }}
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 0',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          {/* Left: copyright + legal links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>
              Copyright &copy; {year} Applore Technologies | All Rights Reserved
            </span>
            <Link
              href="/terms"
              style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#ffffff')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.35)')}
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/privacy"
              style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#ffffff')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.35)')}
            >
              Privacy Policy
            </Link>
          </div>

          {/* Right: compliance badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {['GDPR', 'SSL', 'ISO'].map((badge) => (
              <div
                key={badge}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: 'rgba(255,255,255,0.3)',
                }}
              >
                {badge}
              </div>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
