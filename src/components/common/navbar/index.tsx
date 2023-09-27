import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button, Tooltip } from 'antd';

// Components
import SearchBar from './search-bar';
import ConnectButton from '~/components/connect-wallet';

// Store

import { useSidebarStore } from '~/stores';

// Icons
import BlipLogo from '../../../../public/logo.svg';
import { PiCloudMoon, PiCloudSun, PiMapTrifold } from 'react-icons/pi';

const Navbar = () => {
	const { theme, setTheme } = useTheme();
	const { isOpen, toggleSidebar } = useSidebarStore();
	return (
		<div className='sticky top-0 z-[100] select-none border-b-gray-200 p-2 px-3'>
			<div className='flex flex-row items-center justify-between'>
				<div className='flex flex-row items-center gap-0'>
					<Button
						type='text'
						icon={
							<Image
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
								src={BlipLogo}
								alt='Blip Logo'
								width={22}
								className={`max-w-[22px] ${
									isOpen ? '-translate-x-1 -translate-y-1 rotate-[-120deg]' : ''
								} transition-all duration-[250ms] ease-in-out`}
							/>
						}
						onClick={() => toggleSidebar()}
						className='flex items-center justify-center !p-6 hover:!bg-transparent'
					/>
					<Link href='/' className='text-xl font-bold'>
						Blip
					</Link>
				</div>
				<SearchBar />
				<div className='flex flex-row items-center gap-4'>
					<Tooltip
						title='Roadmap / Suggestions'
						overlayInnerStyle={{
							fontWeight: 600,
							fontSize: '0.875rem',
							padding: '0.5rem 1rem',
						}}
					>
						<Link
							href='https://github.com/users/Envoy-VC/projects/1?pane=issue&itemId=35752665'
							target='_blank'
						>
							<Button
								icon={<PiMapTrifold size={26} />}
								type='text'
								shape='circle'
								size='large'
							/>
						</Link>
					</Tooltip>
					<Button
						type='text'
						shape='circle'
						icon={
							theme === 'dark' ? <PiCloudSun size={24} /> : <PiCloudMoon size={24} />
						}
						onClick={() => {
							setTheme(theme === 'dark' ? 'light' : 'dark');
						}}
					/>
					<ConnectButton />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
