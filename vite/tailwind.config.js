/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'newspaper': ['Cinzel', 'serif'],
        'logo': ['Tajawal', 'serif']
      },
      colors: {
        'fun': '#6CBD91',
        'primary': '#A0C6B1',
        'secondary': '#ACD2BD',
        'csp-yellow': '#FF7C03',
        'csp-yellow-2': '',
      },
    },
  },
  plugins: [],
}
