import { type Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#0F61FF',
				secondary: '#557AFF',
			},
			aspectRatio: {
				'9/16': '9 / 14',
			},
		},
	},
	corePlugins: {
		aspectRatio: false,
	},
	plugins: [require('@tailwindcss/aspect-ratio')],
	darkMode: 'class',
} satisfies Config;
