import React from 'react';
import type { NewMirrorNotification } from '@lens-protocol/react-web';

interface Props {
	notification: NewMirrorNotification;
}

const NewMirrorNotificationPill = ({ notification }: Props) => {
	const { __typename, createdAt } = notification;
	return <div>NotificationPill</div>;
};

export default NewMirrorNotificationPill;
