import React from 'react';
import Image from 'next/image';
import { Button, ConfigProvider, Input, Tooltip } from 'antd';

// Components
import ConnectButton from '../connect-button';

// Icons
import {
	PiMagnifyingGlass,
	PiMicrophoneBold,
	PiMapTrifold,
} from 'react-icons/pi';
import BlipLogo from '@/public/logo.svg';

interface Props {
	sidebarOpen: boolean;
	setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ sidebarOpen, setSideBarOpen }: Props) => {
	return (
		<div className='p-2 px-3 select-none border-b-gray-200'>
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
										? 'rotate-[-120deg] -translate-x-1 -translate-y-1'
										: ''
								} transition-all duration-[250ms] ease-in-out`}
							/>
						}
						onClick={() => setSideBarOpen(!sidebarOpen)}
						className='!p-6 flex justify-center items-center hover:!bg-transparent'
					/>
					<span className='text-[1.25rem] font-bold'>Blip</span>
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
						className='max-w-[28rem] rounded-3xl py-2 px-4 text-[0.875rem] hidden md:flex'
					/>
				</ConfigProvider>
				<div className='flex flex-row items-center gap-4'>
					<Tooltip
						title='Feedback / Suggestions'
						overlayInnerStyle={{
							fontWeight: 600,
							fontSize: '0.875rem',
							padding: '0.5rem 1rem',
						}}
					>
						<Button
							icon={<PiMapTrifold size={26} />}
							type='text'
							shape='circle'
							size='large'
						/>
					</Tooltip>
					<ConnectButton />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
