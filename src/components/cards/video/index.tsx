import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

// Components
import { ProfileAvatar } from '~/components/common';
import VideoCover from './cover';

// Utils
import { formatFollowers } from '~/helpers/profile';
import { ISOTimeToTimeAgo } from '~/helpers/time';

// Types
import type { AnyPublication } from '@lens-protocol/react-web';
import clsx from 'clsx';

interface Props {
	publication: AnyPublication;
	isOnChannelPage: boolean;
}

const VideoCard = ({ publication, isOnChannelPage }: Props) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const video = (publication.__typename === 'Post' && publication) || null;
	const profile = video?.profile;

	const createQueryString = React.useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const onCardClick = () => {
		router
			.push('/watch?' + createQueryString('v', video?.id ?? ''), '', {
				scroll: false,
			})
			.catch(() => toast.error('Something went wrong'));
	};
	return (
		<div
			className='aspect-video flex cursor-pointer flex-col sm:rounded-lg'
			onClick={onCardClick}
		>
			<VideoCover
				video={video}
				height={224}
				className={clsx('!w-[500px] object-cover sm:rounded-lg')}
				preview={false}
			/>
			<div className='mx-2 mt-2 flex flex-row items-start gap-3 sm:mx-0'>
				<div>
					<ProfileAvatar picture={profile?.picture ?? null} size={42} />
				</div>
				<div className='flex flex-col justify-between'>
					<div className='break-words font-sans text-[1rem] font-medium'>
						{(video?.metadata.name ?? '').slice(0, 72)}
					</div>
					{!isOnChannelPage && (
						<span className='truncate text-[1rem] font-medium text-[#a0a0a0]'>
							{profile?.name ?? profile?.handle}
						</span>
					)}
					<div className='flex flex-row items-center gap-2 text-sm font-medium text-[#a0a0a0]'>
						<span>{formatFollowers(video?.stats?.totalUpvotes ?? 0)} likes</span>
						<span className='h-1 w-1 rounded-full bg-[#aaa]'></span>
						<span>{ISOTimeToTimeAgo(video?.createdAt ?? '')}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoCard;
