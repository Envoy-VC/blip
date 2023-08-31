import React from 'react';

// Components
import { NotificationFilters } from '@/components/notifications';

const NotificationsPage = () => {
	return (
		<div className='mx-auto flex w-full max-w-screen-xl flex-col gap-4 p-4'>
			<NotificationFilters />
		</div>
	);
};

export default NotificationsPage;
