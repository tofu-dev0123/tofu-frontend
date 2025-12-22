/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // admin
        admin: {
          main: '#143046',
        },
      },
    },
  },
  plugins: [],
};
