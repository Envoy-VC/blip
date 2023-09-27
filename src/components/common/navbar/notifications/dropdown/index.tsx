import React from 'react';
import { useRouter } from 'next/router';
import { useNotifications } from '@lens-protocol/react-web';
import { Dropdown, Button, Spin } from 'antd';

// Icons
import { LoadingOutlined } from '@ant-design/icons';

// Types
import type { ProfileId, Notification } from '@lens-protocol/react-web';
import type { MenuProps } from 'antd';

interface Props {
	children: React.ReactNode;
	profileId: ProfileId;
	dropdownOpen: boolean;
	setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NotificationPillProps {
	notification: Notification;
}

import {
	NewCollectNotificationPill,
	NewCommentNotificationPill,
	NewFollowNotificationPill,
	NewMentionNotificationPill,
	NewMirrorNotificationPill,
	NewReactionNotificationPill,
} from '../pills';

const NotificationPill = ({ notification }: NotificationPillProps) => {
	if (notification.__typename === 'NewCollectNotification') {
		return <NewCollectNotificationPill notification={notification} />;
	} else if (notification.__typename === 'NewCommentNotification') {
		return <NewCommentNotificationPill notification={notification} />;
	} else if (notification.__typename === 'NewFollowerNotification') {
		return <NewFollowNotificationPill notification={notification} />;
	} else if (notification.__typename === 'NewMentionNotification') {
		return <NewMentionNotificationPill notification={notification} />;
	} else if (notification.__typename === 'NewMirrorNotification') {
		return <NewMirrorNotificationPill notification={notification} />;
	} else if (notification.__typename === 'NewReactionNotification') {
		return <NewReactionNotificationPill notification={notification} />;
	}
};

const NotificationDropdown = ({
	children,
	profileId,
	dropdownOpen,
	setDropdownOpen,
}: Props) => {
	const router = useRouter();
	const { data: notifications, loading } = useNotifications({
		profileId: profileId,
		limit: 10,
	});

	const handleMenuClick = () => {
		console.log('clicked');
	};

	const HeaderItem: MenuProps['items'] = [
		{
			key: 'header',
			label: (
				<div className='flex flex-row items-center justify-between py-2'>
					<span className='text-[1rem] font-semibold'>Notifications</span>
					<Button
						type='link'
						size='middle'
						onClick={() => {
							setDropdownOpen(false);
							router.push('/notifications').catch((err) => {
								console.log(err);
							});
						}}
					>
						View more
					</Button>
				</div>
			),
		},
	];

	if (loading) {
		return (
			<Dropdown
				trigger={['click']}
				menu={{
					items: [
						...HeaderItem,
						{
							key: 'loading',
							label: (
								<div className='flex justify-center py-4'>
									<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
								</div>
							),
						},
					],
					onClick: handleMenuClick,
				}}
				dropdownRender={(menu) => (
					<div className='scrollbar-hide mx-4'>
						{React.cloneElement(menu as React.ReactElement, {
							className: 'min-w-[400px]',
						})}
					</div>
				)}
				open={dropdownOpen}
				placement='bottom'
			>
				{children}
			</Dropdown>
		);
	}

	if (!loading && !!notifications && notifications.length === 0) {
		return (
			<Dropdown
				trigger={['click']}
				menu={{
					items: [
						...HeaderItem,
						{
							key: 'no-notifications',
							label: (
								<div className='flex justify-center py-4 text-sm font-medium'>
									No notifications
								</div>
							),
						},
					],
					onClick: handleMenuClick,
				}}
				dropdownRender={(menu) => (
					<div className='scrollbar-hide mx-4'>
						{React.cloneElement(menu as React.ReactElement, {
							className: 'min-w-[400px]',
						})}
					</div>
				)}
				open={dropdownOpen}
				placement='bottom'
			>
				{children}
			</Dropdown>
		);
	}

	if (!!notifications && !loading) {
		const items: MenuProps['items'] = [
			HeaderItem[0]!,
			...notifications.map((notification) => {
				return {
					key: notification.notificationId,
					label: <NotificationPill notification={notification} />,
				};
			}),
		];

		return (
			<Dropdown
				trigger={['click']}
				menu={{ items, onClick: handleMenuClick }}
				dropdownRender={(menu) => (
					<div className='scrollbar-hide mx-4'>
						{React.cloneElement(menu as React.ReactElement, {
							className: 'scrollbar-hide max-h-[28rem] overflow-y-scroll',
						})}
					</div>
				)}
				open={dropdownOpen}
				placement='bottom'
			>
				{children}
			</Dropdown>
		);
	}
};

export default NotificationDropdown;
