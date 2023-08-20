import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./sections/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
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
		corePlugins: {
			aspectRatio: false,
		},
		plugins: [require('@tailwindcss/aspect-ratio')],
	},
};

export default config;
