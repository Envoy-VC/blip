import React from 'react';

// Components
import NewCollectNotificationPill from './new-collect';
import NewCommentNotificationPill from './new-comment';
import NewFollowerNotificationPill from './new-follower';
import NewMentionNotificationPill from './new-mention';
import NewMirrorNotificationPill from './new-mirror';
import NewReactionNotificationPill from './new-reaction';

// Types
import type { Notification } from '@lens-protocol/react-web';

interface Props {
	notification: Notification;
}

const NotificationPill = ({ notification }: Props) => {
	const { __typename } = notification;
	switch (__typename) {
		case 'NewCollectNotification':
			return <NewCollectNotificationPill notification={notification} />;
		case 'NewCommentNotification':
			return <NewCommentNotificationPill notification={notification} />;
		case 'NewFollowerNotification':
			return <NewFollowerNotificationPill notification={notification} />;
		case 'NewMentionNotification':
			return <NewMentionNotificationPill notification={notification} />;
		case 'NewMirrorNotification':
			return <NewMirrorNotificationPill notification={notification} />;
		case 'NewReactionNotification':
			return <NewReactionNotificationPill notification={notification} />;
		default:
			return <></>;
	}
};

export default NotificationPill;
