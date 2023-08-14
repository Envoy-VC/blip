import React from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Ethereum } from '@thirdweb-dev/chains';

import { ConfigProvider, theme } from 'antd';

import { SEO, Navbar } from '..';
import { TW_CLIENT_ID, AppMetadata } from '@/config';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

interface Props {
	children: React.ReactNode;
}
const { defaultAlgorithm } = theme;

const Layout = ({ children }: Props) => {
	const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false);
	return (
		<ConfigProvider
			theme={{
				algorithm: defaultAlgorithm,
			}}
		>
			<ThirdwebProvider
				activeChain={Ethereum}
				clientId={TW_CLIENT_ID}
				dAppMeta={AppMetadata}
			>
				<>
					<SEO />
					<div className={`flex flex-col ${inter.className}`}>
						<Navbar />
						<div className='flex flex-row'>
							<div>sidebar</div>
							{children}
						</div>
					</div>
				</>
			</ThirdwebProvider>
		</ConfigProvider>
	);
};

export default Layout;
