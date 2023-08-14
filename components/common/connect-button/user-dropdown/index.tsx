import React from 'react';
import { Dropdown, Avatar, Divider } from 'antd';

// Icons
import {
	PiVideo,
	PiNut,
	PiUserSwitch,
	PiBookmarksSimple,
	PiGearSix,
	PiSignOut,
} from 'react-icons/pi';

// Types
import type { MenuProps } from 'antd';

interface Props {
	children: React.ReactNode;
}

interface DropdownItemProps {
	name: string;
	icon: React.ReactNode;
	handleClick?: () => void;
}

const DropDownItem = ({ name, icon, handleClick }: DropdownItemProps) => {
	return (
		<div
			className='flex flex-row gap-3 items-center py-[2px]'
			onClick={handleClick}
		>
			{icon}
			<span className='text-sm font-medium'>{name}</span>
		</div>
	);
};

const UserDropdown = ({ children }: Props) => {
	const dropdownItems: DropdownItemProps[] = [
		{
			name: 'Your channel',
			icon: <PiVideo size={24} color='#000' />,
		},
		{
			name: 'Studio',
			icon: <PiNut size={24} color='#000' />,
		},
		{
			name: 'Switch User',
			icon: <PiUserSwitch size={24} color='#000' />,
		},
		{
			name: 'Bookmarks',
			icon: <PiBookmarksSimple size={24} color='#000' />,
		},
		{
			name: 'Settings',
			icon: <PiGearSix size={24} color='#000' />,
		},
	];

	const menuStyle: React.CSSProperties = {
		backgroundColor: '#fff',
	};

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
				<div className='flex flex-row gap-3 items-center max-w-sm w-full'>
					<div>
						<Avatar
							src='https://ik.imagekit.io/lens/media-snapshot/tr:w-60,h-60/76b1f278593adccb1eccdf3d3bce16fd20082a880ba61f73e3f77978e674be60.png'
							size={40}
							shape='circle'
						/>
					</div>
					<div className='flex flex-col items-start gap-0'>
						<span className='text-[1rem] font-bold'>Envoy_</span>
						<span className='text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-30% from-primary to-secondary'>
							envoy1084.lens
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
			key: '8',
			label: <Divider style={{ margin: 0 }} />,
		},
		{
			key: '9',
			label: (
				<DropDownItem
					name='Sign out'
					icon={<PiSignOut size={24} color='#000' />}
				/>
			),
		},
	];
	return (
		<Dropdown
			menu={{ items }}
			trigger={['click']}
			dropdownRender={(menu) => (
				<div style={contentStyle}>
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
