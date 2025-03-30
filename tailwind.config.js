/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		fontFamily: {
			sans: ['Poppins', 'sans-serif']
		}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#a07462',
					secondary: '#00b0b8',
					accent: '#86dee7',
					neutral: '#0d1b1e',
					'base-100': '#fdf5e6',
					info: '#86dee7',
					success: '#16a34a',
					warning: '#fbbf24',
					error: '#dc2626',
					'base-content': '#090046'
				}
			}
		]
	}
};
