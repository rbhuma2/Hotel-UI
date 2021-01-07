module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    gridTemplateColumns: {
      'fill-40': 'repeat(auto-fill, 15.5rem)',
      '2fr': 'minmax(0, 2fr)',
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
  ],
}
