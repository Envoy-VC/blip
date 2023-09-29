import React from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Menu, ConfigProvider } from 'antd';
import toast from 'react-hot-toast';

// Types
import type { MenuProps } from 'antd';
import { type MenuItemProps } from '~/sections/channel';

const items: MenuItemProps[] = [
	{ label: 'Home' },
	{ label: 'Shorts' },
	{ label: 'Community' },
	{ label: 'Following' },
	{ label: 'About' },
];

const MenuItem = ({ label }: MenuItemProps) => {
	return (
		<div className='rounded-t-lg px-5 font-medium  hover:bg-[rgba(15,97,255,0.1)]'>
			{label}
		</div>
	);
};

const ChannelNavigation = () => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const pageParam = searchParams.get('page');

	const createQueryString = React.useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const onClick: MenuProps['onClick'] = (e) => {
		if (e.key === 'home') {
			router.push(pathname);
		} else {
			router.push(pathname + '?' + createQueryString('page', e.key));
		}
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
				selectedKeys={[pageParam ?? 'home']}
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
