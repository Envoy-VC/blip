import React from 'react';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';

// Icons
import {
	PiDotsThreeVerticalBold,
	PiBookmarksSimple,
	PiShareFat,
	PiThumbsUp,
	PiThumbsDown,
	PiHandHeart,
	PiStackBold,
	PiFlagPennant,
} from 'react-icons/pi';

// Types
import type { IconType } from 'react-icons';

interface MenuItemProps {
	label: string;
	Icon: IconType;
	handleClick?: () => void;
}

const MenuItem = ({ label, Icon, handleClick }: MenuItemProps) => {
	return (
		<div
			className='flex flex-row items-center gap-3 py-[2px]'
			onClick={handleClick}
		>
			<Icon size='22' />
			<span className='text-sm font-medium'>{label}</span>
		</div>
	);
};

const InteractionButtons = () => {
	const dropdownItems: MenuItemProps[] = [
		{
			label: 'Say Thanks',
			Icon: PiHandHeart,
		},
		{
			label: 'Collect as NFT',
			Icon: PiStackBold,
		},
		{
			label: 'Bookmark',
			Icon: PiBookmarksSimple,
		},
		{
			label: 'Report',
			Icon: PiFlagPennant,
		},
	];

	const items: MenuProps['items'] = [
		...dropdownItems.map((item, index) => ({
			key: `${index + 1}`,
			label: <MenuItem {...item} />,
		})),
	];

	const menuStyle: React.CSSProperties = {};

	const contentStyle: React.CSSProperties = {
		backgroundColor: '#F3F4F6',
		borderRadius: '8px',
		padding: '0.5rem',
		width: '225px',
	};

	return (
		<div className='flex flex-row items-center gap-1'>
			<Button
				type='text'
				className='flex items-center justify-center gap-2'
				size='large'
				title='Like'
			>
				<PiThumbsUp size='24' />
				Like
			</Button>
			<Button
				type='text'
				size='large'
				icon={<PiThumbsDown size='24' />}
				title='Dislike'
			/>
			<Button
				type='text'
				size='large'
				icon={<PiShareFat size='24' />}
				title='Share'
			/>
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
				<Button
					type='text'
					size='large'
					icon={<PiDotsThreeVerticalBold size='24' />}
					title='More Options'
				/>
			</Dropdown>
		</div>
	);
};

export default InteractionButtons;
