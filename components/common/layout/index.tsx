import React from 'react';
import { ConfigProvider, theme } from 'antd';

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

// Components
import { SEO, Navbar, Sidebar } from '..';

// Utils
import { Inter } from 'next/font/google';
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

// UI
const inter = Inter({ subsets: ['latin'] });
const { defaultAlgorithm } = theme;

// Types
interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(true);
	return (
		<WagmiConfig config={config}>
			<LensProvider config={lensConfig}>
				<ConfigProvider
					theme={{
						algorithm: defaultAlgorithm,
					}}
				>
					<>
						<SEO />
						<div className={`flex flex-col ${inter.className}`}>
							<Navbar
								sidebarOpen={sidebarOpen}
								setSideBarOpen={setSidebarOpen}
							/>
							<div className='flex flex-row'>
								<Sidebar
									sidebarOpen={sidebarOpen}
									setSideBarOpen={setSidebarOpen}
								/>
								{children}
							</div>
						</div>
					</>
				</ConfigProvider>
			</LensProvider>
		</WagmiConfig>
	);
};

export default Layout;
