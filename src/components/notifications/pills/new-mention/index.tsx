import React from 'react';
import type { NewMentionNotification } from '@lens-protocol/react-web';

interface Props {
	notification: NewMentionNotification;
}

const NewMentionNotificationPill = ({ notification }: Props) => {
	const { __typename, createdAt } = notification;
	return <div>NotificationPill</div>;
};

export default NewMentionNotificationPill;
