import React from 'react';
import {
	Web3Provider,
	LensProtocolProvider,
	LivepeerProvider,
	AntDesignConfigProvider,
	NotificationProvider,
} from '~/providers';
import { ThemeProvider } from 'next-themes';

import clsx from 'clsx';
import { Navbar, SEO, Sidebar, MobileNavbar } from '~/components/common';

// Font
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<ThemeProvider attribute='class' enableSystem={false}>
			<Web3Provider>
				<LivepeerProvider>
					<LensProtocolProvider>
						<AntDesignConfigProvider>
							<NotificationProvider>
								<div
									className={clsx(
										'flex h-screen flex-col justify-between overflow-x-hidden',
										inter.className
									)}
									id='scrollableDiv'
								>
									<SEO />
									<div className='flex flex-col'>
										<Navbar />
										<div className='flex flex-row'>
											<Sidebar />
											{children}
										</div>
									</div>
									<MobileNavbar />
								</div>
							</NotificationProvider>
						</AntDesignConfigProvider>
					</LensProtocolProvider>
				</LivepeerProvider>
			</Web3Provider>
		</ThemeProvider>
	);
};

export default Layout;
