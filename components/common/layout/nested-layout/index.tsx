import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { useTheme } from 'next-themes';
import { Toaster } from 'react-hot-toast';

// Components
import { SEO, Navbar, Sidebar, MobileNavbar } from '@/components/common';

// UI
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
const { defaultAlgorithm, darkAlgorithm } = theme;

// Filter Context
export const FilterContext = React.createContext<{
	tag: string;
	setTag: React.Dispatch<React.SetStateAction<string>>;
}>({
	tag: 'all',
	setTag: () => {},
});

interface Props {
	children: React.ReactNode;
}

const NestedLayout = ({ children }: Props) => {
	const [pageLoaded, setPageLoaded] = React.useState<boolean>(false);
	const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(true);
	const { theme: appTheme, setTheme } = useTheme();
	const [tag, setTag] = React.useState<string>('all');

	React.useEffect(() => {
		setTheme('light');
		setPageLoaded(true);
	}, []);

	if (pageLoaded)
		return (
			<FilterContext.Provider value={{ tag, setTag }}>
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
					<div
						className={`flex flex-col ${inter.className} h-screen justify-between`}
					>
						<div className='flex flex-col'>
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
						<MobileNavbar />
						<Toaster position='bottom-left' />
					</div>
				</ConfigProvider>
			</FilterContext.Provider>
		);
};

export default NestedLayout;
