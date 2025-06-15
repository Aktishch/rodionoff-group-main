import type { Config } from 'tailwindcss'

const createColor = (variable: string): any => {
  return ({ opacityValue }: { opacityValue: undefined | number }): string => {
    return `rgba(var(--color-${variable}), ${opacityValue !== undefined ? opacityValue : 1})`
  }
}

module.exports = {
  content: ['./src/**/*.html', './src/ts/**/*.ts'],
  corePlugins: {
    container: false,
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screens: {
      xs: '459.98px',
      sm: '575.98px',
      md: '767.98px',
      lg: '991.98px',
      xl: '1365.98px',
      xxl: '2499.98px',
    },
    constants: {
      xs: 36,
      sm: 40,
      md: 54,
      lg: 60,
      xl: 70,
      xxl: 80,
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      primary: {
        DEFAULT: createColor('primary'),
      },
      second: {
        DEFAULT: createColor('second'),
      },
      black: {
        DEFAULT: createColor('black'),
      },
      white: {
        DEFAULT: createColor('white'),
      },
      grey: {
        DEFAULT: createColor('grey'),
      },
      glass: {
        DEFAULT: createColor('glass'),
      },
      red: {
        DEFAULT: createColor('red'),
      },
    },
    fontFamily: {
      base: 'var(--font-base)',
    },
    gridColumn: {
      1: 'span 1',
      2: 'span 2',
      3: 'span 3',
      4: 'span 4',
      5: 'span 5',
      6: 'span 6',
      7: 'span 7',
      8: 'span 8',
      9: 'span 9',
      10: 'span 10',
      11: 'span 11',
      12: 'span 12',
    },
    gridRow: {
      1: 'span 1',
      2: 'span 2',
      3: 'span 3',
      4: 'span 4',
      5: 'span 5',
      6: 'span 6',
      7: 'span 7',
      8: 'span 8',
      9: 'span 9',
      10: 'span 10',
      11: 'span 11',
      12: 'span 12',
    },
    extend: {
      content: {
        auto: '""',
      },
      fontSize: {
        min: ['0.5rem', '0.625rem'],
        xxs: ['0.625rem', '0.75rem'],
        '1.5xl': ['1.375rem', '1.75rem'],
        '2.5xl': ['1.75rem', '2.125rem'],
      },
      borderRadius: {
        inherit: 'inherit',
      },
    },
  },
  plugins: [
    require('./plugins/pack'),
    require('./plugins/input'),
    require('./plugins/button'),
    require('./plugins/animation'),
  ],
} satisfies Config
