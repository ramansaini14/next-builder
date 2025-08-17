/**** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,jsx}',
		'./src/components/**/*.{js,jsx}',
		'./src/app/**/*.{js,jsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#0ea5e9',
					dark: '#0284c7',
					light: '#38bdf8',
				},
			},
		},
	},
	plugins: [],
};