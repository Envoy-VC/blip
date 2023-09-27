import React from 'react';

// LensSDK Imports
import { LensProvider } from '@lens-protocol/react-web';
import { development, production } from '@lens-protocol/react-web';
import type { LensConfig } from '@lens-protocol/react-web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';

import { env } from '~/env.mjs';

const { NEXT_PUBLIC_ENVIRONMENT } = env;

// Lens Config

const lensConfig: LensConfig = {
	bindings: wagmiBindings(),
	environment:
		NEXT_PUBLIC_ENVIRONMENT === 'production' ? production : development,
};

interface Props {
	children: React.ReactNode;
}

const LensProtocolProvider = ({ children }: Props) => {
	return <LensProvider config={lensConfig}>{children}</LensProvider>;
};

export default LensProtocolProvider;
