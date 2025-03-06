/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx}",
    ],
    theme: {
      extend: {
        gridTemplateColumns: {
          'auto': 'repeat(auto-fill, minmax(200px, 1fr))',
        },
        colors: {
          'primary': '#5f6fff',
        }
      }
    },
    plugins: [],
  }