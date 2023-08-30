import { Button, ConfigProvider, Input, Tooltip } from 'antd';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Components
import ConnectButton from '../connect-button';

// Icons
import BlipLogo from '@/public/logo.svg';
import {
	PiCloudMoon,
	PiCloudSun,
	PiMagnifyingGlass,
	PiMapTrifold,
	PiMicrophoneBold,
} from 'react-icons/pi';

interface Props {
	sidebarOpen: boolean;
	setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ sidebarOpen, setSideBarOpen }: Props) => {
	const { theme, setTheme } = useTheme();
	return (
		<div className='select-none border-b-gray-200 p-2 px-3'>
			<div className='flex flex-row items-center justify-between'>
				<div className='flex flex-row items-center gap-0'>
					<Button
						type='text'
						icon={
							<Image
								src={BlipLogo}
								alt='Blip Logo'
								width={22}
								className={`max-w-[22px] ${
									sidebarOpen
										? '-translate-x-1 -translate-y-1 rotate-[-120deg]'
										: ''
								} transition-all duration-[250ms] ease-in-out`}
							/>
						}
						onClick={() => setSideBarOpen(!sidebarOpen)}
						className='flex items-center justify-center !p-6 hover:!bg-transparent'
					/>
					<Link href='/' className='text-[1.25rem] font-bold'>
						Blip
					</Link>
				</div>
				<ConfigProvider
					theme={{
						token: {
							controlOutline: 'none',
							colorPrimaryHover: 'none',
						},
					}}
				>
					<Input
						placeholder='Search'
						prefix={<PiMagnifyingGlass size={16} color='#92959C' />}
						suffix={
							<Tooltip
								title='Voice search coming soon...'
								overlayInnerStyle={{
									fontWeight: 600,
									fontSize: '0.875rem',
									padding: '0.5rem 1rem',
								}}
							>
								<PiMicrophoneBold size={16} color='#474B57' />
							</Tooltip>
						}
						size='small'
						className='hidden max-w-[28rem] rounded-3xl px-4 py-2 text-[0.875rem] md:flex'
					/>
				</ConfigProvider>
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
							theme === 'dark' ? (
								<PiCloudSun size={24} />
							) : (
								<PiCloudMoon size={24} />
							)
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
