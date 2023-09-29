import React from 'react';
import Link from 'next/link';
import { ProfileAvatar } from '~/components/common';

// Icons
import { PiStack } from 'react-icons/pi';

// Types
import type { NewCollectNotification } from '@lens-protocol/react-web';
interface Props {
	notification: NewCollectNotification;
}

const NewCollectNotificationPill = ({ notification }: Props) => {
	const {
		__typename,
		createdAt,
		wallet: { address, defaultProfile },
		collectedPublication,
	} = notification;

	return (
		<div className='aborder-[2px] aborder-[#E4E7EA] w-full p-4 transition-colors duration-[400] ease-in-out'>
			<div className='flex flex-row items-start gap-3'>
				<PiStack size={28} className='mt-3 text-primary' />
				<div className='flex h-full flex-col gap-2'>
					<div className='m-1 w-fit rounded-full border-2 border-[#476cff]'>
						<ProfileAvatar picture={defaultProfile?.picture ?? null} size={36} />
					</div>
					<div className='inline-flex gap-1 font-sans text-[1rem]'>
						<span className='font-semibold'>
							{!!defaultProfile ? (
								<Link href={`/channel/${defaultProfile.handle}`}>
									<span>{`${defaultProfile.name}`}</span>
								</Link>
							) : (
								address.slice(0, 6) + '...' + address.slice(-4)
							)}
						</span>
						collected your
						<span className='font-semibold'>
							{collectedPublication.__typename === 'Post' && 'post.'}
							{collectedPublication.__typename === 'Comment' && 'comment.'}
							{collectedPublication.__typename === 'Mirror' && 'mirror.'}
						</span>
					</div>
					<div className='text-medium text-sm text-[#aaa]'>
						{collectedPublication.__typename === 'Comment' && (
							<span>
								{collectedPublication.metadata.content?.slice(0, 64) ??
									collectedPublication.metadata.name?.slice(0, 64) ??
									collectedPublication.id}
							</span>
						)}
						{collectedPublication.__typename === 'Post' && (
							<span>
								{collectedPublication.metadata.content?.slice(0, 64) ??
									collectedPublication.metadata.name?.slice(0, 64) ??
									collectedPublication.id}
							</span>
						)}
						{collectedPublication.__typename === 'Mirror' && (
							<span>
								{collectedPublication.mirrorOf.metadata.content?.slice(0, 64) ??
									collectedPublication.mirrorOf.metadata.name?.slice(0, 64) ??
									collectedPublication.id}
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewCollectNotificationPill;
