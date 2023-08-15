import React from 'react';
import { Badge, Button } from 'antd';

import {
	ProfileId,
	useUnreadNotificationCount,
} from '@lens-protocol/react-web';

import { PiBell } from 'react-icons/pi';

interface NotificationProps {
	profileId: ProfileId;
}

const Notifications = ({ profileId }: NotificationProps) => {
	const { unreadNotificationCount, loading, clear } =
		useUnreadNotificationCount({ profileId });

	return (
		<Badge
			count={unreadNotificationCount || 0}
			color='geekblue'
			offset={[-6, 6]}
		>
			<Button icon={<PiBell size={26} />} type='text' size='large' />
		</Badge>
	);
};

export default Notifications;
