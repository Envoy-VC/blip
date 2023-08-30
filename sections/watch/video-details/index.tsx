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
		<div className='m-2 flex flex-col'>
			<span className='font-sans text-xl font-medium'>{videoTitle || ''}</span>
			<div className='flex flex-row items-center justify-between'>
				<div className='flex flex-row items-center gap-2'>
					<div>
						<ProfileAvatar picture={picture || null} size={42} />
					</div>
					<div className='flex flex-col font-sans font-semibold'>
						<span className='text-lg'>{name || ''}</span>
						<span className='text-sm text-[#aaa]'>
							{formatFollowers(totalFollowers || 0)} followers
						</span>
					</div>
				</div>
				<InteractionButtons />
			</div>
			<div className='my-4 flex flex-col items-start gap-1'>
				<span className='font-sans text-[1rem] font-medium'>
					{ISOTimeToDay(createdAt || '')}
				</span>
				<div className='max-w-sm whitespace-pre-wrap break-words px-1 font-sans text-[1rem] font-medium sm:max-w-2xl sm:px-0'>
					<ContentRenderer showFull={showDescription}>
						{content}
					</ContentRenderer>
				</div>
				<Button
					type='link'
					className='!px-0 font-medium'
					onClick={() => setShowDescription(!showDescription)}
				>
					{showDescription ? 'Show less' : 'Show more'}
				</Button>
			</div>
		</div>
	);
};

export default VideoDetails;
