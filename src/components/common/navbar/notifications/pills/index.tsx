import { ReactionTypes } from '@lens-protocol/react-web';

import type {
	NewCollectNotification,
	NewCommentNotification,
	NewFollowerNotification,
	NewMentionNotification,
	NewMirrorNotification,
	NewReactionNotification,
} from '@lens-protocol/react-web';

import { ProfileAvatar } from '~/components/common';

import { ISOTimeToTimeAgo } from '~/helpers/time';

export const NewCollectNotificationPill = ({
	notification,
}: {
	notification: NewCollectNotification;
}) => {
	const {
		createdAt,
		wallet: { defaultProfile },
		collectedPublication,
	} = notification;
	return (
		<div className='my-1 flex max-w-xs flex-row items-start gap-2 sm:max-w-md'>
			<div className='min-w-[42px]'>
				<ProfileAvatar picture={defaultProfile?.picture ?? null} size={42} />
			</div>
			<div className='flex flex-col text-[1rem]'>
				<span className='break-all font-medium'>{`${
					defaultProfile?.name ?? defaultProfile?.handle
				} collected your ${collectedPublication.__typename.toLocaleLowerCase()}`}</span>
				<span className='break-all text-sm'>
					{collectedPublication?.__typename === 'Post' &&
						(
							collectedPublication.metadata.content ??
							collectedPublication.metadata.name ??
							''
						).slice(0, 64)}
				</span>
				<span className='text-sm font-medium text-[#aaa]'>
					{ISOTimeToTimeAgo(createdAt ?? '')}
				</span>
			</div>
		</div>
	);
};

export const NewCommentNotificationPill = ({
	notification,
}: {
	notification: NewCommentNotification;
}) => {
	const {
		createdAt,
		profile,
		comment: { commentOn },
	} = notification;
	return (
		<div className='my-1 flex max-w-xs flex-row items-start gap-2 sm:max-w-md'>
			<div className='min-w-[42px]'>
				<ProfileAvatar picture={profile?.picture ?? null} size={42} />
			</div>
			<div className='flex flex-col text-[1rem]'>
				<span className='break-all font-medium'>{`${
					profile?.name ?? profile?.handle
				} commented on  your ${commentOn?.__typename.toLocaleLowerCase()}`}</span>
				<span className='break-all text-sm'>
					{commentOn?.__typename === 'Post' &&
						(commentOn.metadata.content ?? commentOn.metadata.name ?? '').slice(
							0,
							64
						)}
				</span>
				<span className='text-sm font-medium text-[#aaa]'>
					{ISOTimeToTimeAgo(createdAt ?? '')}
				</span>
			</div>
		</div>
	);
};

export const NewFollowNotificationPill = ({
	notification,
}: {
	notification: NewFollowerNotification;
}) => {
	const {
		createdAt,
		wallet: { defaultProfile },
	} = notification;
	return (
		<div className='my-1 flex max-w-sm flex-row items-start gap-2 sm:max-w-md'>
			<div className='min-w-[42px]'>
				<ProfileAvatar picture={defaultProfile?.picture ?? null} size={42} />
			</div>
			<div className='flex flex-col text-[1rem]'>
				<span className='break-all font-medium'>{`${
					defaultProfile?.name ?? defaultProfile?.handle
				} started following you`}</span>
				<span className='text-sm font-medium text-[#aaa]'>
					{ISOTimeToTimeAgo(createdAt ?? '')}
				</span>
			</div>
		</div>
	);
};

export const NewMentionNotificationPill = ({
	notification,
}: {
	notification: NewMentionNotification;
}) => {
	const {
		createdAt,
		mentionPublication: { profile, __typename, metadata },
	} = notification;
	return (
		<div className='my-1 flex max-w-xs flex-row items-start gap-2 sm:max-w-md'>
			<div className='min-w-[42px]'>
				<ProfileAvatar picture={profile?.picture ?? null} size={42} />
			</div>
			<div className='flex flex-col text-[1rem]'>
				<span className='break-all font-medium'>{`${
					profile?.name ?? profile?.handle
				} mentioned you in their ${__typename.toLocaleLowerCase()}`}</span>
				<span className='break-all text-sm'>
					{__typename === 'Post' &&
						(metadata.content ?? metadata.name ?? '').slice(0, 64)}
					{__typename === 'Comment' &&
						(metadata.content ?? metadata.name ?? '').slice(0, 64)}
				</span>
				<span className='text-sm font-medium text-[#aaa]'>
					{ISOTimeToTimeAgo(createdAt ?? '')}
				</span>
			</div>
		</div>
	);
};

export const NewMirrorNotificationPill = ({
	notification,
}: {
	notification: NewMirrorNotification;
}) => {
	const { createdAt, profile, publication } = notification;
	return (
		<div className='my-1 flex max-w-xs flex-row items-start gap-2 sm:max-w-md'>
			<div className='min-w-[42px]'>
				<ProfileAvatar picture={profile?.picture ?? null} size={42} />
			</div>
			<div className='flex flex-col text-[1rem]'>
				<span className='break-all font-medium'>{`${
					profile?.name ?? profile?.handle
				} mirrored your ${publication.__typename.toLocaleLowerCase()}`}</span>
				<span className='break-all text-sm'>
					{publication?.__typename === 'Post' &&
						(publication.metadata.content ?? publication.metadata.name ?? '').slice(
							0,
							64
						)}
				</span>
				<span className='text-sm font-medium text-[#aaa]'>
					{ISOTimeToTimeAgo(createdAt ?? '')}
				</span>
			</div>
		</div>
	);
};

export const NewReactionNotificationPill = ({
	notification,
}: {
	notification: NewReactionNotification;
}) => {
	const { createdAt, reaction, profile, publication } = notification;
	return (
		<div className='my-1 flex max-w-sm flex-row items-start gap-2 sm:max-w-md'>
			<div className='min-w-[42px]'>
				<ProfileAvatar picture={profile?.picture ?? null} size={42} />
			</div>
			<div className='flex flex-col text-[1rem]'>
				<span className='break-all font-medium'>{`${
					profile?.name ?? profile?.handle
				} ${
					reaction === ReactionTypes.Upvote ? 'liked' : 'disliked'
				} your ${publication.__typename.toLocaleLowerCase()}`}</span>
				<span className='break-all text-sm'>
					{publication?.__typename === 'Post' &&
						(publication.metadata.content ?? publication.metadata.name ?? '').slice(
							0,
							64
						)}
				</span>
				<span className='text-sm font-medium text-[#aaa]'>
					{ISOTimeToTimeAgo(createdAt ?? '')}
				</span>
			</div>
		</div>
	);
};
