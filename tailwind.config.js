/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 高对比度主色与前景色
        primary: {
          DEFAULT: '#2563eb', // 蓝色
          foreground: '#fff',
        },
        background: {
          DEFAULT: '#fff',
          dark: '#18181b',
        },
      },
      borderColor: {
        primary: '#2563eb',
        cyan: '#22d3ee',
      },
      textColor: {
        primary: '#2563eb',
        'primary-foreground': '#fff',
        dark: '#fff',
      },
    },
  },
  plugins: [],
};
