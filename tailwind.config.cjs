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
				'text-art': '#AA33BD',
				monument: '#FFAAEC',
				'text-monument': '#FFD600',
				nature: '#C476FF',
				'text-nature': '#5B2FDE',
				time: '#FFE40F',
				'text-time': '#38794B',
			},
			fontFamily: {
				'sans': ['Roboto Condensed', 'Arial', 'sans-serif'],
				'serif': ['Merriweather']
			}
    }
  },
  plugins: []
};