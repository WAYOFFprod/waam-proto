/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      container: {
				center: true,
				padding: '1rem'
			},
			dropShadow: {
				'3xl-center': '0 0 50px rgba(0, 0, 0, 0.80)',
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
			fontFamily: {
				'sans': ['Roboto Condensed', 'Arial', 'sans-serif'],
				'serif': ['Merriweather']
			}
    }
  },
  plugins: []
};