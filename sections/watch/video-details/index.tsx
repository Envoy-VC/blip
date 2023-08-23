import React from 'react';
import { Button } from 'antd';
import { VideoContext } from '@/pages/watch/[...publicationId]';

// Components
import { ProfileAvatar, ContentRenderer } from '@/components/common';
import { InteractionButtons } from '@/components/video-page';

// Utils
import { formatFollowers, ISOTimeToDay } from '@/utils';

const VideoDetails = () => {
	const { post } = React.useContext(VideoContext);
	const {
		createdAt,
		profile: {
			name,
			picture,
			stats: { totalFollowers },
		},
		metadata: { name: videoTitle, content },
	} = post!;
	const [showDescription, setShowDescription] = React.useState<boolean>(false);
	return (
		<div className='flex flex-col m-2'>
			<span className='text-xl font-medium font-sans'>{videoTitle || ''}</span>
			<div className='flex flex-row justify-between items-center'>
				<div className='flex flex-row gap-2 items-center'>
					<div>
						<ProfileAvatar picture={picture || null} size={42} />
					</div>
					<div className='flex flex-col font-semibold font-sans'>
						<span className='text-lg'>{name || ''}</span>
						<span className='text-sm text-[#aaa]'>
							{formatFollowers(totalFollowers || 0)} followers
						</span>
					</div>
				</div>
				<InteractionButtons />
			</div>
			<div className='flex flex-col gap-1 my-4 items-start'>
				<span className='text-[1rem] font-medium font-sans'>
					{ISOTimeToDay(createdAt || '')}
				</span>
				<div className='font-sans font-medium whitespace-pre-wrap break-words max-w-sm sm:max-w-2xl text-[1rem] px-1 sm:px-0'>
					<ContentRenderer showFull={showDescription}>
						{content}
					</ContentRenderer>
				</div>
				<Button
					type='link'
					className='font-medium !px-0'
					onClick={() => setShowDescription(!showDescription)}
				>
					{showDescription ? 'Show less' : 'Show more'}
				</Button>
			</div>
		</div>
	);
};

export default VideoDetails;
