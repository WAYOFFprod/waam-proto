/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      container: {
				center: true,
				padding: '1rem'
			},
      screens: {
				xl: { max: '1920px' },
				lg: { max: '1400px' },
				md: { max: '1023px' },
				sm: { max: '767px' },
				xs: { max: '480px' }
			},
      colors: {
				mblack: '#030404',
				morange: '#ffab05',
			},
    }
  },
  plugins: []
};