import React from 'react';

// wagmi Imports
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

import { env } from '~/env.mjs';

const { NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID, NEXT_PUBLIC_ENVIRONMENT } = env;

// Wagmi Config
const { publicClient, webSocketPublicClient } = configureChains(
	[polygonMumbai, polygon],
	[publicProvider()]
);

const config = createConfig({
	autoConnect: true,
	publicClient,
	webSocketPublicClient,
	connectors: [
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		new InjectedConnector({
			options: {
				shimDisconnect: false,
			},
		}),
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		new WalletConnectConnector({
			chains:
				NEXT_PUBLIC_ENVIRONMENT === 'production' ? [polygon] : [polygonMumbai],
			options: {
				projectId: NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
			},
		}),
	],
});

interface Props {
	children: React.ReactNode;
}

const Web3Provider = ({ children }: Props) => {
	return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default Web3Provider;
