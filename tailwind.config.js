/** @type {import('tailwindcss').Config} */
export default {
  // Scan all source that can contain class names. NOT public/ — those static
  // legal pages have their own inline CSS and do not use Tailwind.
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
  ],
  theme: { extend: {} },
  plugins: [],
};
