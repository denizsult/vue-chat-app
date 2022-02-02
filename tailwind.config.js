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
        spin: 'spin 1.5s linear infinite',
      },


      keyframes: theme => ({

        spin: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },

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
        'mainColor': '#f7fafc'
      }

    }
  },
  variants: {
    extend: {}
  },

}