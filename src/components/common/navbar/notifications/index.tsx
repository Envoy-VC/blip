import React from 'react';
import { Badge, Button } from 'antd';

import { useUnreadNotificationCount } from '@lens-protocol/react-web';

// Components
import NotificationDropdown from './dropdown';

// Icons
import { PiBell } from 'react-icons/pi';

// Types
import type { ProfileId } from '@lens-protocol/react-web';
interface NotificationProps {
	profileId: ProfileId;
}

const Notifications = ({ profileId }: NotificationProps) => {
	const { unreadNotificationCount, loading } = useUnreadNotificationCount({
		profileId,
	});

	const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false);

	return (
		<NotificationDropdown
			profileId={profileId}
			dropdownOpen={dropdownOpen}
			setDropdownOpen={setDropdownOpen}
		>
			<Badge
				count={!loading ? unreadNotificationCount : 0}
				color='geekblue'
				offset={[-6, 6]}
				classNames={{ indicator: '!text-white' }}
			>
				<Button
					icon={<PiBell size={26} />}
					type='text'
					size='large'
					onClick={() => setDropdownOpen(!dropdownOpen)}
				/>
			</Badge>
		</NotificationDropdown>
	);
};

export default Notifications;
