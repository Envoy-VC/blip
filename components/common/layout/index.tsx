import React from 'react';
import { ThemeProvider } from 'next-themes';

// Apollo Client
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// wagmi Imports
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

// LensSDK Imports
import { LensProvider } from '@lens-protocol/react-web';
import { LensConfig, development, production } from '@lens-protocol/react-web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';

// Livepeer Imports
import {
	createReactClient,
	studioProvider,
	LivepeerConfig,
	ThemeConfig,
} from '@livepeer/react';

// Utils
import { WALLET_CONNECT_PROJECT_ID, ENVIRONMENT, LIVEPEER_KEY } from '@/config';

// Apollo Config
const client = new ApolloClient({
	uri: 'https://api.lens.dev/',
	cache: new InMemoryCache(),
});

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
		// @ts-ignore
		new InjectedConnector({
			options: {
				shimDisconnect: false,
			},
		}),
		// @ts-ignore
		new WalletConnectConnector({
			chains: [polygonMumbai, polygon],
			options: {
				projectId: WALLET_CONNECT_PROJECT_ID,
			},
		}),
	],
});

// Lens Config

const lensConfig: LensConfig = {
	bindings: wagmiBindings(),
	environment: production,
};

// Livepeer Config

const livepeerClient = createReactClient({
	provider: studioProvider({ apiKey: LIVEPEER_KEY }),
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

// Types
interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<ThemeProvider attribute='class'>
			<WagmiConfig config={config}>
				<LivepeerConfig client={livepeerClient} theme={theme}>
					<ApolloProvider client={client}>
						<LensProvider config={lensConfig}>{children}</LensProvider>
					</ApolloProvider>
				</LivepeerConfig>
			</WagmiConfig>
		</ThemeProvider>
	);
};

export default Layout;
