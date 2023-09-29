import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { useActiveProfile } from '@lens-protocol/react-web';

// Icons
import {
	PiHouse,
	PiFilmStrip,
	PiPlusCircle,
	PiSignature,
	PiVideo,
} from 'react-icons/pi';

interface INavbarItem {
	label?: React.ReactNode;
	icon: React.ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleClick?: () => any;
}

const MobileNavbar = () => {
	const router = useRouter();
	const { data: activeProfile } = useActiveProfile();
	const NavbarItems: INavbarItem[] = [
		{
			label: 'Home',
			icon: <PiHouse size={24} />,
			handleClick: () => router.push('/'),
		},
		{
			label: 'Shorts',
			icon: <PiFilmStrip size={24} />,
		},
		{
			icon: <PiPlusCircle size={36} />,
		},
		{
			label: 'Feed',
			icon: <PiSignature size={24} />,
			handleClick: () => router.push('/feed'),
		},
		{
			label: 'Profile',
			icon: <PiVideo size={24} />,
			handleClick: () => {
				if (!!activeProfile) {
					router.push(`/channel/${activeProfile.handle}`).catch(() => {
						console.log('Error navigating to profile');
					});
				}
			},
		},
	];
	return (
		<div className='sticky bottom-0 z-[100] flex w-full flex-row  justify-around bg-white py-2 shadow-md dark:bg-[#121212] sm:hidden'>
			{NavbarItems.map((item, index) => (
				<div className='flex flex-col items-center justify-between' key={index}>
					<Button
						icon={item.icon}
						type='text'
						shape='circle'
						onClick={item.handleClick}
					/>
					{item.label && (
						<span className='font-sans text-sm font-medium'>{item.label}</span>
					)}
				</div>
			))}
		</div>
	);
};

export default MobileNavbar;
