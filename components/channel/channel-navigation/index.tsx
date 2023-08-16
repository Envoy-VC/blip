import React from 'react';
import { Menu, ConfigProvider } from 'antd';

// Types
import type { MenuProps } from 'antd';

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
				items={NavigationItems}
				style={{ flex: 'auto', minWidth: 0 }}
			/>
		</ConfigProvider>
	);
};

const NavigationItems: MenuProps['items'] = [
	{
		label: <div className='px-5 font-medium'>Home</div>,
		key: 'home',
	},
	{
		label: <div className='px-5 font-medium'>Videos</div>,
		key: 'videos',
	},
	{
		label: <div className='px-5 font-medium'>Shorts</div>,
		key: 'shorts',
	},
	{
		label: <div className='px-5 font-medium'>Community</div>,
		key: 'community',
	},
	{
		label: <div className='px-5 font-medium'>Channels</div>,
		key: 'channels',
	},
	{
		label: <div className='px-5 font-medium'>About</div>,
		key: 'about',
	},
];

export default ChannelNavigation;
