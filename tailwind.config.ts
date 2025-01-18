import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			backgroundImage: {
				pattern: 'url("/pattern.svg")'
			},
			backgroundColor: {
				'c-grey': 'rgba(120, 120, 120, 0.07)'
			},
			fontFamily: {
				sans: ['CabinetGrotesk', 'system-ui', 'sans-serif'],
				array : ['Array']
			},
		}
	},

	plugins: [typography]
} satisfies Config;
