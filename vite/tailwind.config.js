export default {
  purge: {
    enabled: process.env.NODE_ENV ==='production',
    content: [
      './src/**/*.html',
      './src/**/*.jsx',
      './src/**/*.js'
    ],
  },
  theme: {
    extend: {
      // fontFamily: {
      //   'newspaper': ['Cinzel', 'serif'],
      //   'logo': ['Tajawal', 'serif']
      // },
    },
  },
  plugins: [],
}


// tailwind.config.js

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.js'],
  },
  // Other Tailwind CSS configurations...
};
