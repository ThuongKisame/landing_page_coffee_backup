/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      keyframes: {
        appear: {
          '0%': { transform: 'scale(1, 0)' },
          '100%': { transform: 'scale(1, 1)' },
        },
        wiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '5%': { transform: 'rotate(15deg)' },
          '10%': { transform: 'rotate(0deg)' },
          '15%': { transform: 'rotate(-15deg)' },
          '20%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(15deg)' },
          '30%': { transform: 'rotate(0deg)' },
          '35%': { transform: 'rotate(-15deg)' },
          '40%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        // ping: 'wiggle 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
