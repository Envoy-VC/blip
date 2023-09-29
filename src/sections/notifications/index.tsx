import React from 'react';
import { Spin } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useNotifications, NotificationTypes } from '@lens-protocol/react-web';
import InfiniteScroll from 'react-infinite-scroll-component';

// Components
import {
	NotificationFilters,
	NotificationPill,
} from '~/components/notifications';

// Icons
import { LoadingOutlined } from '@ant-design/icons';

// Types
import type { ProfileId } from '@lens-protocol/react-web';

interface Props {
	profileId: ProfileId;
}

const NotificationsPage = ({ profileId }: Props) => {
	const searchParams = useSearchParams();
	const hasNotificationsFilter = searchParams.has('filter');
	const notificationsFilter = searchParams.get('filter');

	const filters = {
		collects: [
			NotificationTypes.CollectedComment,
			NotificationTypes.CollectedPost,
		],
		comments: [
			NotificationTypes.CommentedComment,
			NotificationTypes.CommentedPost,
		],
		follows: [NotificationTypes.Followed],
		mentions: [NotificationTypes.MentionComment, NotificationTypes.MentionPost],
		mirrors: [NotificationTypes.MirroredPost, NotificationTypes.MirroredComment],
		reactions: [
			NotificationTypes.ReactionPost,
			NotificationTypes.ReactionComment,
		],
	};

	const {
		data: notifications,
		loading,
		error,
		hasMore,
		next,
	} = useNotifications({
		profileId: profileId,
		limit: 10,
		notificationTypes: hasNotificationsFilter
			? filters[notificationsFilter as keyof typeof filters]
			: undefined,
	});

	return (
		<div className='mx-auto flex w-full max-w-screen-xl flex-col gap-4 p-4'>
			<NotificationFilters />
			<div className='flex flex-col px-0 sm:px-2'>
				{loading && (
					<div className='my-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
						loading
					</div>
				)}
				{!!notifications && (
					<InfiniteScroll
						dataLength={notifications.length}
						next={next}
						hasMore={hasMore}
						scrollableTarget='scrollableDiv'
						loader={
							<div className='mx-auto w-fit pb-8'>
								<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
							</div>
						}
					>
						<div className='flex flex-col'>
							{notifications.map((notification) => (
								<NotificationPill
									notification={notification}
									key={notification.notificationId}
								/>
							))}
						</div>
					</InfiniteScroll>
				)}
			</div>
		</div>
	);
};

export default NotificationsPage;
