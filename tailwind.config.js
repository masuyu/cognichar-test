module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/*.js',
      './src/Components/*.js',
    ],
    options: {
      whitelist: ['justify-start', 'justify-end', 'justify-center', 'justify-btween', 'justify-around', 'justify-evenly']
    }
  },
  theme: {},
  variants: {},
  plugins: [],
}
