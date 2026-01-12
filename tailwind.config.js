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
        public: {
          main: '#f6efdb',
        },
      },
      fontFamily: {
        logo: ['var(--font-logo)'],
        grotesk: ['var(--font-grotesk)'],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/typography'), // ← これ必須
  ],
};
