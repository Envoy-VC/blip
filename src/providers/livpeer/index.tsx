import React from 'react';

// Livepeer Imports
import {
	createReactClient,
	studioProvider,
	LivepeerConfig,
} from '@livepeer/react';

import type { ThemeConfig } from '@livepeer/react';

import { env } from '~/env.mjs';
const { NEXT_PUBLIC_LIVEPEER_KEY } = env;

// Livepeer Config
const livepeerClient = createReactClient({
	provider: studioProvider({ apiKey: NEXT_PUBLIC_LIVEPEER_KEY }),
});

const theme: ThemeConfig = {
	colors: {
		accent: '#0F61FF',
		containerBorderColor: 'rgba(0, 145, 255, 0.9)',
	},
	fonts: {
		display: 'Inter',
	},
	radii: {
		containerBorderRadius: '4px',
		slider: '4px',
	},
};

interface Props {
	children: React.ReactNode;
}

const LivepeerProvider = ({ children }: Props) => {
	return (
		<LivepeerConfig client={livepeerClient} theme={theme}>
			{children}
		</LivepeerConfig>
	);
};

export default LivepeerProvider;
