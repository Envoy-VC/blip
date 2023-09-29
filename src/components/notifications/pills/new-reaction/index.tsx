import React from 'react';
import type { NewReactionNotification } from '@lens-protocol/react-web';

interface Props {
	notification: NewReactionNotification;
}

const NewReactionNotificationPill = ({ notification }: Props) => {
	const { __typename, createdAt } = notification;
	return <div>NotificationPill</div>;
};

export default NewReactionNotificationPill;
