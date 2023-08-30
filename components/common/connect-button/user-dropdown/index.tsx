import React from 'react';
import { Dropdown, Avatar, Divider } from 'antd';
import { useTheme } from 'next-themes';
import { ProfileOwnedByMe, useWalletLogout } from '@lens-protocol/react-web';

import { ProfileAvatar } from '../..';

// Icons
import {
	PiVideo,
	PiNut,
	PiUserSwitch,
	PiBookmarksSimple,
	PiGearSix,
	PiSignOut,
	PiCloudSun,
	PiCloudMoon,
} from 'react-icons/pi';

// Types
import type { MenuProps } from 'antd';

interface Props {
	children: React.ReactNode;
	profile: ProfileOwnedByMe;
}

interface DropdownItemProps {
	name: string;
	icon: React.ReactNode;
	handleClick?: () => void;
}

const DropDownItem = ({ name, icon, handleClick }: DropdownItemProps) => {
	return (
		<div
			className='flex flex-row items-center gap-3 py-[2px]'
			onClick={handleClick}
		>
			{icon}
			<span className='text-sm font-medium'>{name}</span>
		</div>
	);
};

const UserDropdown = ({ children, profile }: Props) => {
	const { theme, setTheme } = useTheme();
	const { execute: logout } = useWalletLogout();
	const dropdownItems: DropdownItemProps[] = [
		{
			name: 'Your channel',
			icon: <PiVideo size={24} />,
		},
		{
			name: 'Studio',
			icon: <PiNut size={24} />,
		},
		{
			name: 'Switch User',
			icon: <PiUserSwitch size={24} />,
		},
		{
			name: 'Bookmarks',
			icon: <PiBookmarksSimple size={24} />,
		},
		{
			name: 'Settings',
			icon: <PiGearSix size={24} />,
		},
	];

	const menuStyle: React.CSSProperties = {};

	const contentStyle: React.CSSProperties = {
		backgroundColor: '#F3F4F6',
		borderRadius: '8px',
		padding: '0.5rem',
		width: '225px',
	};

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<div className='flex w-full max-w-sm flex-row items-center gap-3'>
					<div className='max-w-[40px]'>
						<ProfileAvatar
							picture={profile?.picture || null}
							size={40}
							shape='circle'
						/>
					</div>
					<div className='flex flex-col items-start gap-0'>
						<span className='text-[1rem] font-bold'>
							{profile?.name?.slice(0, 15) || ''}
						</span>
						<span className='bg-gradient-to-r from-primary from-30% to-secondary bg-clip-text text-sm font-bold text-transparent'>
							{profile?.handle.slice(0, 22) || ''}
						</span>
					</div>
				</div>
			),
		},
		...dropdownItems.map((item, index) => ({
			key: `${index + 2}`,
			label: <DropDownItem {...item} />,
		})),
		{
			key: '7',
			label: (
				<DropDownItem
					name={
						theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
					}
					icon={
						theme === 'dark' ? (
							<PiCloudSun size={24} />
						) : (
							<PiCloudMoon size={24} />
						)
					}
					handleClick={() => {
						setTheme(theme === 'dark' ? 'light' : 'dark');
					}}
				/>
			),
		},
		{
			key: '8',
			label: <Divider style={{ margin: 0 }} />,
		},
		{
			key: '9',
			label: (
				<DropDownItem
					name='Sign out'
					icon={<PiSignOut size={24} />}
					handleClick={logout}
				/>
			),
		},
	];
	return (
		<Dropdown
			menu={{ items }}
			trigger={['click']}
			dropdownRender={(menu) => (
				<div style={contentStyle} className='dark:!bg-transparent'>
					{React.cloneElement(menu as React.ReactElement, {
						style: menuStyle,
					})}
				</div>
			)}
		>
			{children}
		</Dropdown>
	);
};

export default UserDropdown;
