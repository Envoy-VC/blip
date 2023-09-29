import React from 'react';
import Link from 'next/link';
import { ProfileAvatar } from '~/components/common';

// Icons
import { PiChats } from 'react-icons/pi';

// Types
import type { NewCommentNotification } from '@lens-protocol/react-web';
interface Props {
	notification: NewCommentNotification;
}

const NewCommentNotificationPill = ({ notification }: Props) => {
	const {
		__typename,
		createdAt,
		profile,
		comment: { commentOn },
	} = notification;
	return (
		<div className='w-full border-[2px] border-[#E4E7EA] bg-[#FAFAFA] p-4 transition-colors duration-[400] ease-in-out hover:bg-[#FAFBFF] dark:bg-[#141414] dark:hover:bg-[#0f5fff13]'>
			<div className='flex flex-row items-start gap-3'>
				<PiChats size={28} className='mt-3 text-[#ff9651]' />
				<div className='flex h-full flex-col gap-2'>
					<div className='m-1 w-fit rounded-full border-2 border-[#476cff]'>
						<ProfileAvatar picture={profile?.picture ?? null} size={36} />
					</div>
					<div className='inline-flex gap-1 font-sans text-[1rem]'>
						<span className='font-semibold'>
							<Link href={`/channel/${profile.handle}`}>
								<span>{`${profile.name}`}</span>
							</Link>
						</span>
						commented on your
						<span className='font-semibold'>
							{commentOn?.__typename === 'Post' && 'post.'}
							{commentOn?.__typename === 'Comment' && 'comment.'}
							{commentOn?.__typename === 'Mirror' && 'mirror.'}
						</span>
					</div>
					<div className='text-medium text-sm text-[#aaa]'>
						{!!commentOn && commentOn.__typename === 'Comment' && (
							<span>
								{commentOn.metadata.content?.slice(0, 64) ??
									commentOn.metadata.name?.slice(0, 64) ??
									commentOn.id}
							</span>
						)}
						{!!commentOn && commentOn.__typename === 'Post' && (
							<span>
								{commentOn.metadata.content?.slice(0, 64) ??
									commentOn.metadata.name?.slice(0, 64) ??
									commentOn.id}
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewCommentNotificationPill;
