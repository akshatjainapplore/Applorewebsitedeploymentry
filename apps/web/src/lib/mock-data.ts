import type { ContentBlock } from '@applore/types';

export const MOCK_HOMEPAGE_BLOCKS: ContentBlock[] = [
  {
    id: 'mock-hero',
    type: 'hero',
    order: 1,
    data: {
      heading: 'Technology\nThat Inspires',
      description:
        'We build digital products, platforms, and experiences that help ambitious businesses grow faster and smarter.',
      ctaText: 'Start a Conversation',
      ctaLink: '/contact',
      secondaryCtaText: 'Our Work',
      secondaryCtaLink: '/work',
    },
  },
  {
    id: 'mock-grid',
    type: 'grid',
    order: 2,
    data: {
      heading: 'End-to-end digital solutions',
      subheading: 'Built for the way modern businesses operate.',
      columns: 3,
      items: [
        {
          id: 'g1',
          title: 'Product Strategy',
          description:
            'We partner with you to define a clear roadmap — validating ideas, identifying gaps, and prioritising features that create real value.',
        },
        {
          id: 'g2',
          title: 'Design & UX',
          description:
            'Pixel-perfect interfaces grounded in user research. Every interaction is intentional, every screen purposeful.',
        },
        {
          id: 'g3',
          title: 'Engineering',
          description:
            'Scalable, maintainable code delivered fast. From MVPs to enterprise platforms — we write software that lasts.',
        },
        {
          id: 'g4',
          title: 'Mobile Applications',
          description:
            'Native and cross-platform apps for iOS & Android that users actually love to open.',
        },
        {
          id: 'g5',
          title: 'Cloud & DevOps',
          description:
            'Infrastructure that scales with you — automated pipelines, containerised deployments, 99.9% uptime.',
        },
        {
          id: 'g6',
          title: 'AI & Automation',
          description:
            'Intelligent features baked into your product — LLM integrations, recommendation engines, workflow automation.',
        },
      ],
    },
  },
  {
    id: 'mock-cards',
    type: 'cards',
    order: 3,
    data: {
      heading: 'Recent work we are proud of',
      cards: [
        {
          id: 'c1',
          title: 'SquadXP — Gamified Team Engagement',
          description:
            'A real-time points, badges, and leaderboard platform that lifted employee engagement scores by 38%.',
          tag: 'Product',
          link: '/work/squadxp',
        },
        {
          id: 'c2',
          title: 'FinFlow — Banking Super-App',
          description:
            "End-to-end UX redesign of a neo-bank's core app, reducing onboarding drop-off by 52%.",
          tag: 'Mobile',
          link: '/work/finflow',
        },
        {
          id: 'c3',
          title: 'MedSync — Healthcare Platform',
          description:
            'HIPAA-compliant telehealth portal connecting 10,000+ patients with specialists across 3 countries.',
          tag: 'Healthcare',
          link: '/work/medsync',
        },
        {
          id: 'c4',
          title: 'Orbit CMS — Headless Content Platform',
          description:
            'A multi-tenant headless CMS powering 200+ marketing sites for a global media group.',
          tag: 'Platform',
          link: '/work/orbit',
        },
      ],
    },
  },
  {
    id: 'mock-testimonials',
    type: 'testimonials',
    order: 4,
    data: {
      heading: 'Trusted by teams who ship great products',
      testimonials: [
        {
          id: 't1',
          quote:
            "Applore turned our vague concept into a polished product in under three months. The team's attention to detail is unmatched.",
          author: 'Priya Mehta',
          role: 'CPO',
          company: 'FinFlow',
          rating: 5,
        },
        {
          id: 't2',
          quote:
            "They don't just write code — they think like product owners. Every decision was grounded in user impact.",
          author: 'James Okafor',
          role: 'CTO',
          company: 'MedSync',
          rating: 5,
        },
        {
          id: 't3',
          quote:
            'Our engagement scores jumped 38% within the first quarter after launching SquadXP. Exceptional work.',
          author: 'Ananya Krishnan',
          role: 'Head of People',
          company: 'TechCorp',
          rating: 5,
        },
        {
          id: 't4',
          quote:
            "Fast, communicative, and genuinely invested in our success. We've extended the engagement three times now.",
          author: 'Luca Ferrari',
          role: 'Founder',
          company: 'Orbit Media',
          rating: 5,
        },
      ],
    },
  },
  {
    id: 'mock-cta',
    type: 'cta',
    order: 5,
    data: {
      heading: "Let's build something great together.",
      description:
        'Tell us about your project — we respond within one business day.',
      buttonText: 'Start a Conversation',
      buttonLink: '/contact',
      buttonVariant: 'primary',
      backgroundColor: '#242424',
    },
  },
  {
    id: 'mock-faq',
    type: 'faq',
    order: 6,
    data: {
      heading: 'Frequently asked questions',
      items: [
        {
          id: 'f1',
          question: 'How long does a typical project take?',
          answer:
            'Most projects run 8–16 weeks from kick-off to launch, depending on scope. We break work into two-week sprints so you see progress every fortnight and can course-correct early.',
        },
        {
          id: 'f2',
          question: 'Do you work with early-stage startups?',
          answer:
            'Absolutely. We love working with founders who are validating ideas. We offer lean MVP engagements designed to get you to market quickly and learn fast.',
        },
        {
          id: 'f3',
          question: 'What does your typical engagement look like?',
          answer:
            'We start with a discovery workshop (1–2 weeks) to align on goals and scope. From there we move into iterative design and build cycles, with regular demos and feedback loops throughout.',
        },
        {
          id: 'f4',
          question: 'Can you work with our existing team?',
          answer:
            'Yes — we integrate seamlessly as an extension of your team. We use your tools, attend your standups, and communicate transparently throughout.',
        },
        {
          id: 'f5',
          question: 'What tech stack do you use?',
          answer:
            "We default to Next.js, React Native, Node.js, and PostgreSQL, but we adapt to what's right for your project. We have experience across the modern web and mobile ecosystem.",
        },
      ],
    },
  },
];

export const MOCK_SITE_SETTINGS = {
  siteTitle: 'Applore',
  tagline: 'Technology That Inspires',
  logoUrl: '',
  socialLinks: {
    twitter: 'https://twitter.com/applore',
    linkedin: 'https://linkedin.com/company/applore',
    instagram: 'https://instagram.com/applore',
    github: 'https://github.com/applore',
  },
};

export const MOCK_HEADER_MENU = {
  items: [
    { id: 'm1', label: 'Services', url: '/services', order: 1, target: '_self', children: [] },
    { id: 'm2', label: 'Work', url: '/work', order: 2, target: '_self', children: [] },
    { id: 'm3', label: 'About', url: '/about', order: 3, target: '_self', children: [] },
    { id: 'm4', label: 'Blog', url: '/blog', order: 4, target: '_self', children: [] },
    { id: 'm5', label: 'Contact', url: '/contact', order: 5, target: '_self', children: [] },
  ],
};

export const MOCK_FOOTER_MENU = {
  items: [
    { id: 'f1', label: 'Services', url: '/services', order: 1, target: '_self', children: [] },
    { id: 'f2', label: 'Work', url: '/work', order: 2, target: '_self', children: [] },
    { id: 'f3', label: 'About', url: '/about', order: 3, target: '_self', children: [] },
    { id: 'f4', label: 'Blog', url: '/blog', order: 4, target: '_self', children: [] },
    { id: 'f5', label: 'Careers', url: '/careers', order: 5, target: '_self', children: [] },
    { id: 'f6', label: 'Privacy Policy', url: '/privacy', order: 6, target: '_self', children: [] },
  ],
};
