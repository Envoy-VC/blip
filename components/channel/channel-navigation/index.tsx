import React from 'react';
import { Menu, ConfigProvider } from 'antd';

// Types
import type { MenuProps } from 'antd';
import { MenuItemProps, MenuItemType } from '@/sections/channel';

const items: MenuItemProps[] = [
	{ label: 'Home' },
	{ label: 'Shorts' },
	{ label: 'Community' },
	{ label: 'Channels' },
	{ label: 'About' },
];

const MenuItem = ({ label, handleClick }: MenuItemProps) => {
	return (
		<div
			className='px-5 font-medium hover:bg-[rgba(15,97,255,0.1)]  rounded-t-lg'
			onClick={handleClick}
		>
			{label}
		</div>
	);
};

interface Props {
	activeMenuItem: MenuItemType;
	setActiveMenuItem: React.Dispatch<React.SetStateAction<MenuItemType>>;
}

const ChannelNavigation = ({ activeMenuItem, setActiveMenuItem }: Props) => {
	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
		setActiveMenuItem(e.key as MenuItemType);
	};

	return (
		<ConfigProvider
			theme={{
				token: {
					fontWeightStrong: 800,
				},
				components: {
					Menu: {
						fontSize: 16,
						itemPaddingInline: 1,
					},
				},
			}}
		>
			<Menu
				onClick={onClick}
				selectedKeys={[activeMenuItem]}
				defaultSelectedKeys={['home']}
				mode='horizontal'
				items={items.map((item, index) => {
					return {
						key: item.label.toLowerCase(),
						label: <MenuItem key={index} label={item.label} />,
					};
				})}
				style={{ flex: 'auto', minWidth: 0 }}
			/>
		</ConfigProvider>
	);
};

export default ChannelNavigation;
