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
			safelist: [
        'bg-art',
        'bg-monument',
        'bg-nature',
        'bg-time',
        'text-text-art',
				'text-text-monument',
				'text-text-nature',
				'text-text-time',
    ],
      screens: {
				xl: { max: '1920px' },
				lg: { max: '1400px' },
				md: { max: '1023px' },
				sm: { max: '767px' },
				xs: { max: '480px' }
			},
      colors: {
				art: '#AAFFBD',
				'text-art': '#A75C89',
				monument: '#FFAAEC',
				'text-monument': '#3C8A85',
				nature: '#FFE40F',
				'text-nature': '#648FDE',
				time: '#C476FF',
				'text-time': '#FFD600',
				tourism: '#D9202C',
				'text-tourisme': '#D7EAB2'
			},
			fontFamily: {
				'sans': ['Roboto Condensed', 'Arial', 'sans-serif'],
				'serif': ['Merriweather']
			}
    }
  },
  plugins: []
};