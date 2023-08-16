import React from 'react';
import { ThemeProvider } from 'next-themes';

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

// Utils
import { WALLET_CONNECT_PROJECT_ID, ENVIRONMENT } from '@/config';

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

// Types
interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<ThemeProvider attribute='class'>
			<WagmiConfig config={config}>
				<LensProvider config={lensConfig}>{children}</LensProvider>
			</WagmiConfig>
		</ThemeProvider>
	);
};

export default Layout;
