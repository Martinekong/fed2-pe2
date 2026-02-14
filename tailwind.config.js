/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2C6754',
        primary_hover: '#245646',
        secondary: '#DFE5DD',
        secondary_hover: '#D1DBCE',
        tertiary: '#2E332F',
        background: '#FBFBF9',
        accent_cold: '#526E6B',
        accent_warm: '#918C8C',
        error: '#BE2345',
      },
      fontFamily: {
        heading: ['Urbanist', 'sans-serif'],
        body: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
