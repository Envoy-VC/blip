import React from 'react';
import type { NewFollowerNotification } from '@lens-protocol/react-web';

interface Props {
	notification: NewFollowerNotification;
}

const NewFollowerNotificationPill = ({ notification }: Props) => {
	const { __typename, createdAt } = notification;
	return <div>NotificationPill</div>;
};

export default NewFollowerNotificationPill;
