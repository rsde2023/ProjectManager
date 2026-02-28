/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  safelist: [
    'bg-green-500', 'bg-green-100', 'text-green-700',
    'bg-green-50', 'text-green-600',
    'bg-orange-500', 'bg-orange-100', 'text-orange-700',
    'bg-orange-50', 'text-orange-600',
    'bg-blue-500', 'bg-blue-100', 'text-blue-700',
    'bg-blue-50', 'text-blue-600',
    'bg-yellow-50', 'text-yellow-600', 'bg-yellow-400',
    'bg-red-50', 'text-red-600',
    'bg-blue-400', 'bg-green-400',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}