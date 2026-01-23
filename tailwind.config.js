/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2C6754',
        primary_hover: '#3A836C',
        secondary: '#2E332F',
        tertiary: '#DFE5DD',
        background: '#FBFBF9',
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
