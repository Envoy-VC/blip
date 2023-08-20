import React from 'react';
import { AnyPublication } from '@lens-protocol/react-web';

import { ProfileAvatar } from '../..';
import VideoCover from './video-cover';

import { ISOTimeToTimeAgo, formatFollowers } from '@/utils';

interface Props {
	publication: AnyPublication;
	isOnChannelPage: boolean;
}

const VideoCard = ({ publication, isOnChannelPage }: Props) => {
	const video = (publication.__typename === 'Post' && publication) || null;
	let profile = video?.profile;
	return (
		<div className='flex flex-col rounded-lg aspect-video'>
			<VideoCover
				video={video}
				height={224}
				className='rounded-lg object-cover !w-[500px]'
				preview={false}
			/>
			<div className='flex flex-row items-start gap-3 mt-2'>
				<div>
					<ProfileAvatar picture={profile?.picture || null} size={42} />
				</div>
				<div className='flex flex-col'>
					<div className='text-[1rem] font-medium break-words font-sans'>
						{(video?.metadata.name || '').slice(0, 72)}
					</div>
					{!isOnChannelPage && (
						<span className='text-[#a0a0a0] font-medium text-[1rem]'>
							{profile?.handle || ''}
						</span>
					)}
					<div className='flex flex-row items-center gap-2 text-[#a0a0a0] font-medium text-sm'>
						<span>
							{formatFollowers(video?.stats?.totalUpvotes || 0)} likes
						</span>
						<span className='w-1 h-1 rounded-full bg-[#aaa]'></span>
						<span>{ISOTimeToTimeAgo(video?.createdAt || '')}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoCard;
