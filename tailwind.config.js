/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      listStyleType:{
        circle: 'circle'
      },
      colors:{
        'primary': '#29BFF0',
        'secondary': '#135F8A'
      },
      borderColor:{
        'primary': '#29BFF0',
        'secondary': '#135F8A'
      }
    },
  },
  plugins: [],
};
