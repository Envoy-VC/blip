import React from 'react';
import { Menu, ConfigProvider } from 'antd';

// Types
import type { MenuProps } from 'antd';

interface MenuItemProps {
	label: string;
	handleClick?: () => void;
}

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

const items: MenuItemProps[] = [
	{ label: 'Home' },
	{ label: 'Videos' },
	{ label: 'Shorts' },
	{ label: 'Community' },
	{ label: 'Channels' },
	{ label: 'About' },
];

const ChannelNavigation = () => {
	const [selectedKey, setSelectedKey] = React.useState<string>('home');

	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
		setSelectedKey(e.key);
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
				selectedKeys={[selectedKey]}
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
