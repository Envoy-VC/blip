import React from 'react';
import { Button, Dropdown } from 'antd';
import { MenuProps } from 'antd';

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

interface MenuItemProps {
	label: string;
	icon: any;
	handleClick?: () => void;
}
const MenuItem = ({ label, icon, handleClick }: MenuItemProps) => {
	return (
		<div
			className='flex flex-row gap-3 items-center py-[2px]'
			onClick={handleClick}
		>
			{icon}
			<span className='text-sm font-medium'>{label}</span>
		</div>
	);
};

const InteractionButtons = () => {
	const dropdownItems: MenuItemProps[] = [
		{
			label: 'Say Thanks',
			icon: <PiHandHeart size='22' />,
		},
		{
			label: 'Collect as NFT',
			icon: <PiStackBold size='22' />,
		},
		{
			label: 'Bookmark',
			icon: <PiBookmarksSimple size='22' />,
		},
		{
			label: 'Report',
			icon: <PiFlagPennant size='22' />,
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
		<div className='flex flex-row gap-1 items-center'>
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
