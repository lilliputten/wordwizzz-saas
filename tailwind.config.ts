import { Config } from 'tailwindcss';

import { fontFamily } from 'tailwindcss/defaultTheme';

import { getColorSpread } from './build-utils/getColorSpread';
import { brandBlueColor, brandOrangeColor, primaryColor, secondaryColor } from './config/theme';

// Core app color definitions
// UNUSED? Construct primary/secondary colors spread tables
// (with keys 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950) from key colors.
const primaryColorSpread = getColorSpread('primary', primaryColor);
const brandOrangeColorSpread = getColorSpread('app-orange', brandOrangeColor);
const brandBlueColorSpread = getColorSpread('app-blue', brandBlueColor);
const secondaryColorSpread = brandOrangeColorSpread; // getColorSpread('secondary', secondaryColor);

const config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './ui/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '.8rem',
    },
    extend: {
      colors: {
        ...primaryColorSpread,
        ...brandOrangeColorSpread,
        ...brandBlueColorSpread,
        ...secondaryColorSpread,
        // primary: {
        //   DEFAULT: 'rgb(var(--primaryColorRGB))',
        //   foreground: 'rgb(var(--primaryForegroundColorRGB))',
        // },
        // secondary: {
        //   DEFAULT: 'rgb(var(--secondaryColorRGB))',
        //   foreground: 'rgb(var(--secondaryForegroundColorRGB))',
        // },
        border: 'hsl(var(--borderColorHSL))',
        input: 'hsl(var(--inputColorHSL))',
        ring: 'hsl(var(--ringColorHSL))',
        background: 'hsl(var(--backgroundColorHSL))',
        foreground: 'hsl(var(--foregroundColorHSL))',
        destructive: {
          DEFAULT: 'hsl(var(--destructiveColorHSL))',
          foreground: 'hsl(var(--destructiveForegroundColorHSL))',
        },
        muted: {
          DEFAULT: 'hsl(var(--mutedColorHSL))',
          foreground: 'hsl(var(--mutedForegroundColorHSL))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accentColorHSL))',
          foreground: 'hsl(var(--accentForegroundColorHSL))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popoverColorHSL))',
          foreground: 'hsl(var(--popoverForegroundColorHSL))',
        },
        card: {
          DEFAULT: 'hsl(var(--cardColorHSL))',
          foreground: 'hsl(var(--cardForegroundColorHSL))',
        },
      },
      borderRadius: {
        lg: 'var(--borderRadiusSize)',
        md: 'calc(var(--borderRadiusSize) - 2px)',
        sm: 'calc(var(--borderRadiusSize) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        urban: ['var(--font-urban)', ...fontFamily.sans],
        heading: ['var(--font-heading)', ...fontFamily.sans],
        geist: ['var(--font-geist)', ...fontFamily.sans],
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
        // Fade up and down
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '80%': {
            opacity: '0.7',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        'fade-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '80%': {
            opacity: '0.6',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        // Fade in and out
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '50%': {
            opacity: '0.6',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '0',
          },
          '50%': {
            opacity: '0.6',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',

        // Fade up and down
        'fade-up': 'fade-up 0.5s',
        'fade-down': 'fade-down 0.5s',

        // Fade in and out
        'fade-in': 'fade-in 0.4s',
        'fade-out': 'fade-out 0.4s',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;

export default config;
