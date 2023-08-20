import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { useTheme } from 'next-themes';

// Components
import { SEO, Navbar, Sidebar } from '@/components/common';

// UI
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
const { defaultAlgorithm, darkAlgorithm } = theme;

interface Props {
	children: React.ReactNode;
}

const NestedLayout = ({ children }: Props) => {
	const [pageLoaded, setPageLoaded] = React.useState<boolean>(false);
	const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(true);
	const { theme: appTheme, setTheme } = useTheme();

	React.useEffect(() => {
		setTheme('light');
		setPageLoaded(true);
	}, []);

	if (pageLoaded)
		return (
			<ConfigProvider
				theme={{
					algorithm:
						appTheme === undefined
							? defaultAlgorithm
							: appTheme === 'light'
							? defaultAlgorithm
							: darkAlgorithm,
				}}
			>
				<SEO />
				<div className={`flex flex-col ${inter.className}`}>
					<Navbar sidebarOpen={sidebarOpen} setSideBarOpen={setSidebarOpen} />
					<div className='flex flex-row'>
						<Sidebar
							sidebarOpen={sidebarOpen}
							setSideBarOpen={setSidebarOpen}
						/>
						{children}
					</div>
				</div>
			</ConfigProvider>
		);
};

export default NestedLayout;
