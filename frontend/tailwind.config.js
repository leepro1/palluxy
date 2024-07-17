/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'main-background': "url('@assets/images/homePage/mainBackground.svg')",
      },
      colors: {
        'pal-overlay': '#1C1515',
        'pal-purple': '#4B4376',
        'pal-lightwhite': '#F9F9F9',
        'pal-error': '#CA0238',
        'pal-blue': '#215597',
        'pal-disable': '#919191',
      },
    },
    fontFamily: {
      jamsilThin: ['JamsilThin', 'sans-serif'],
      jamsilLight: ['JamsilLight', 'sans-serif'],
      jamsilRegular: ['JamsilRegular', 'sans-serif'],
      jamsilMedium: ['JamsilMedium', 'sans-serif'],
      jamsilBold: ['JamsilBold', 'sans-serif'],
      jamsilExtraBold: ['JamsilExtraBold', 'sans-serif'],
      pretendard: ['Pretendard', 'sans-serif'],
    },
  },
  plugins: [],
};
