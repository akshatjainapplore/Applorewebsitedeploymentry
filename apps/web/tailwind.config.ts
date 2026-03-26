import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Applore Figma design tokens
        brand: {
          purple: '#6e45ff',
          'purple-light': '#8b4efd',
          'purple-pale': '#f2e7ff',
          dark: '#242424',
          'dark-alt': '#1e1e1e',
          cream: '#f8f6f1',
          'cream-dark': '#f0ede5',
          blue: '#005afd',
          'blue-light': '#10a4f2',
          'teal-light': '#d5f2f2',
          black: '#000000',
          white: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        manrope: ['Manrope', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['80px', { lineHeight: '88px', letterSpacing: '-2.4px' }],
        'display-lg': ['64px', { lineHeight: '72px', letterSpacing: '-1.92px' }],
        'display-md': ['48px', { lineHeight: '56px', letterSpacing: '-0.96px' }],
        'heading-lg': ['40px', { lineHeight: '48px', letterSpacing: '-0.8px' }],
        'heading-md': ['32px', { lineHeight: '40px', letterSpacing: '-0.64px' }],
        'heading-sm': ['24px', { lineHeight: '32px', letterSpacing: '-0.24px' }],
        'body-xl': ['20px', { lineHeight: '30px' }],
        'body-lg': ['18px', { lineHeight: '28px' }],
        'body-md': ['16px', { lineHeight: '24px' }],
        'body-sm': ['14px', { lineHeight: '20px' }],
        'label-sm': ['10.4px', { lineHeight: '16.6px', letterSpacing: '0.4px' }],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '40px',
        full: '9999px',
      },
      boxShadow: {
        'card-sm': '1px 1px 4px rgba(0,0,0,0.11)',
        'card-md': '2px 4px 4px rgba(0,0,0,0.09)',
        'card-lg': '0 0 4px rgba(0,0,0,0.15)',
        'card-xl': '0 14px 44px rgba(0,0,0,0.30)',
      },
      spacing: {
        '18': '72px',
        '22': '88px',
        '30': '120px',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'ticker': 'ticker 30s linear infinite',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
