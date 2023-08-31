import React from 'react';
import { useRouter } from 'next/router';
import { AnyPublication } from '@lens-protocol/react-web';

// Components
import { ProfileAvatar } from '../..';
import VideoCover from './video-cover';

// Utils
import { ISOTimeToTimeAgo, formatFollowers } from '@/utils';

interface Props {
	publication: AnyPublication;
	isOnChannelPage: boolean;
}

const VideoCard = ({ publication, isOnChannelPage }: Props) => {
	const router = useRouter();
	const video = (publication.__typename === 'Post' && publication) || null;
	let profile = video?.profile;
	return (
		<div
			className='flex aspect-video cursor-pointer flex-col sm:rounded-lg'
			onClick={() => router.push(`/watch/${video?.id}`)}
		>
			<VideoCover
				video={video}
				height={224}
				className='sm:rounded-lg object-cover !w-[500px]'
				preview={false}
			/>
			<div className='mt-2 flex flex-row items-start gap-3 sm:mx-0 mx-2'>
				<div>
					<ProfileAvatar picture={profile?.picture || null} size={42} />
				</div>
				<div className='flex flex-col justify-between'>
					<div className='break-words font-sans text-[1rem] font-medium'>
						{(video?.metadata.name || '').slice(0, 72)}
					</div>
					{!isOnChannelPage && (
						<span className='truncate text-[1rem] font-medium text-[#a0a0a0]'>
							{profile?.name || profile?.handle}
						</span>
					)}
					<div className='flex flex-row items-center gap-2 text-sm font-medium text-[#a0a0a0]'>
						<span>
							{formatFollowers(video?.stats?.totalUpvotes || 0)} likes
						</span>
						<span className='h-1 w-1 rounded-full bg-[#aaa]'></span>
						<span>{ISOTimeToTimeAgo(video?.createdAt || '')}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoCard;
