module.exports = {
    extract: {
      include: ['./**/*.html', './**/*.vue', './**/*.css'],
    },
    darkMode: 'class',
    theme: {
      extend: {
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