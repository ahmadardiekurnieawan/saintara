import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#121212',
        ink: '#0A0E1A',
        navy: '#0F172A',
        gold: '#C59830',
        'gold-light': '#D4A843',
        'gold-dark': '#A87E22',
        surface: '#F8F8F6',
        cream: '#FBFAF7',
        'ai-blue': '#2563EB',
        muted: '#6B7280',
        border: '#E5E7EB',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'Georgia', 'serif'],
        montserrat: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      borderRadius: {
        DEFAULT: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '28px',
        full: '9999px',
      },
      maxWidth: { container: '1200px' },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.1)',
        gold: '0 0 24px rgba(197,152,48,0.28)',
        elevated: '0 24px 60px -20px rgba(15,23,42,0.35), 0 8px 24px -12px rgba(15,23,42,0.18)',
        float: '0 30px 80px -28px rgba(10,14,26,0.55)',
        soft: '0 2px 16px -4px rgba(15,23,42,0.08)',
      },
      backgroundImage: {
        'gradient-navy': 'linear-gradient(135deg, #0F172A 0%, #121212 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C59830 0%, #D4A843 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0A0E1A 0%, #131A2E 48%, #0F172A 100%)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.22,1,0.36,1)',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
        aurora: 'aurora 18s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(24px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        aurora: {
          '0%,100%': { transform: 'translate(0,0) scale(1)', opacity: '0.6' },
          '50%': { transform: 'translate(4%,-6%) scale(1.12)', opacity: '0.9' },
        },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
