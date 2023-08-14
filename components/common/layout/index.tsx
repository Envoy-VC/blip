import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { LensProvider } from '@lens-protocol/react-web';

import { SEO, Navbar, Sidebar } from '..';

import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { publicProvider } from 'wagmi/providers/public';

const { publicClient, webSocketPublicClient } = configureChains(
	[polygonMumbai, polygon],
	[publicProvider()]
);

const config = createConfig({
	autoConnect: true,
	publicClient,
	webSocketPublicClient,
	connectors: [
		new InjectedConnector({
			options: {
				shimDisconnect: false,
			},
		}),
	],
});

import { LensConfig, development } from '@lens-protocol/react-web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';

const lensConfig: LensConfig = {
	bindings: wagmiBindings(),
	environment: development,
};

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

interface Props {
	children: React.ReactNode;
}

const { defaultAlgorithm } = theme;

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
