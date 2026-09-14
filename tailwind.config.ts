import type { Config } from 'tailwindcss'

/**
 * Tokens resolve through CSS custom properties so a single `dark` class on
 * <html> repaints the whole site. Brand greens stay fixed; everything that has
 * to invert (surfaces, text, rules) is a variable.
 */
const v = (name: string) => `rgb(var(${name}) / <alpha-value>)`

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* themed */
        bg: v('--bg'),
        surface: v('--surface'),
        raised: v('--raised'),
        line: v('--line'),
        'line-hi': v('--line-hi'),
        body: v('--text'),
        heading: v('--heading'),
        muted: v('--muted'),
        'muted-2': v('--muted-2'),
        'gold-text': v('--accent-text'),
        /* fixed brand */
        forest: '#1B4332',
        pine: '#2D6A4F',
        sage: '#74C476',
        gold: '#B8893B',
        'gold-hi': '#D9A94E',
        'gold-soft': '#E7D8BE',
        cream: '#EFEBE1',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['clamp(2.15rem, 1.15rem + 3.1vw, 4.1rem)', { lineHeight: '1.02' }],
        h1: ['clamp(2rem, 1.3rem + 2.6vw, 3.6rem)', { lineHeight: '1.06' }],
        h2: ['clamp(1.65rem, 1.25rem + 1.6vw, 2.6rem)', { lineHeight: '1.12' }],
        lead: ['clamp(1.1rem, 1.03rem + 0.4vw, 1.35rem)', { lineHeight: '1.55' }],
        body: ['clamp(1.0625rem, 1.03rem + 0.15vw, 1.125rem)', { lineHeight: '1.65' }],
        caption: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.2em' }],
      },
      spacing: {
        section: 'clamp(80px, 6vw + 40px, 160px)',
        major: 'clamp(40px, 2vw + 24px, 64px)',
        gutter: 'clamp(22px, 5.5vw, 80px)',
      },
      maxWidth: { container: '1440px', content: '1200px', measure: '680px' },
      borderRadius: { DEFAULT: '2px', sm: '2px', md: '4px', panel: '20px' },
      transitionTimingFunction: { out: 'cubic-bezier(0.16, 0.84, 0.3, 1)' },
      keyframes: {
        riseFade: { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'none' } },
        riseMask: { from: { transform: 'translateY(105%)' }, to: { transform: 'translateY(0)' } },
        scanline: {
          '0%': { transform: 'translateY(-6%)', opacity: '0' },
          '14%': { opacity: '1' },
          '86%': { opacity: '1' },
          '100%': { transform: 'translateY(106%)', opacity: '0' },
        },
        ruleIn: { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
      },
      animation: {
        'rise-fade': 'riseFade 700ms cubic-bezier(0.16,0.84,0.3,1) forwards',
        'rise-mask': 'riseMask 1s cubic-bezier(0.16,0.84,0.3,1) forwards',
        scanline: 'scanline 1.15s cubic-bezier(0.4,0,0.2,1) forwards',
        'rule-in': 'ruleIn 1s cubic-bezier(0.16,0.84,0.3,1) forwards',
      },
    },
  },
  plugins: [],
}

export default config
