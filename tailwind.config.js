module.exports = {
  extract: {
    include: ['./**/*.html', './**/*.vue', './**/*.css'],
  },
  darkMode: 'class',
  theme: {
    screens: {
      'sm': '425px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
   
      animation: {
        fade: 'fadeOut 3s ease-in-out',
      },
      keyframes: theme => ({
        fadeOut: {
          '0%': {
            backgroundColor: theme('colors.red.300'),
          },
          '100%': {
            backgroundColor: theme('colors.transparent')
          },
        },
      }),
      container: {
        center: true
      },
      colors: {
        'windi-blue': '#00a0e9',
        'windi-green': '#00e600',
        'windi-red': '#e60000',
        'windi-yellow': '#e6e600'
      }

    }
  },
  variants: {
    extend: {}
  },

}