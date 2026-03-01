/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
 safelist: [
  // project borders & badges
  'bg-green-500', 'bg-orange-500', 'bg-blue-500',
  'bg-green-100', 'bg-orange-100', 'bg-blue-100',
  'text-green-700', 'text-orange-700', 'text-blue-700',
  // task dots
  'bg-yellow-400', 'bg-blue-400', 'bg-green-400',
  // task status badges
  'bg-yellow-50', 'text-yellow-600',
  'bg-blue-50', 'text-blue-600',
  'bg-green-50', 'text-green-600',
  // task priority badges
  'bg-red-200', 'text-red-600',
  'bg-orange-200', 'text-orange-600',
  'bg-green-200', 'text-green-600',
  'text-red-500', 'text-orange-500', 'text-green-500',
],
  theme: {
    extend: {},
  },
  plugins: [],
}