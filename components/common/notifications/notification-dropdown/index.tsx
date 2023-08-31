import React from 'react';
import {
	ProfileId,
	useNotifications,
	Notification,
} from '@lens-protocol/react-web';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Dropdown } from 'antd';

// Types
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
} from '../notification-pills';

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
	const {
		data: notifications,
		loading,
		hasMore,
		next,
	} = useNotifications({
		profileId: profileId,
		limit: 10,
	});

	const handleMenuClick = () => {};

	if (!!notifications && !loading) {
		const items: MenuProps['items'] = [
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
