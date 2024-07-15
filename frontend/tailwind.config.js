/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'main-background': "url('@assets/images/homePage/mainBackground.svg')",
      },
      colors: {
        overlay: '#1C1515',
      },
    },
  },
  plugins: [],
};
