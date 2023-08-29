import React from 'react';
import { useRouter } from 'next/router';
import { Post } from '@lens-protocol/react-web';

// Components
import VideoCover from '@/components/common/cards/video-card/video-cover';

// Utils
import { ISOTimeToTimeAgo } from '@/utils';

interface Props {
	video: Post;
}

const RecommendedVideoCard = ({ video }: Props) => {
	const router = useRouter();
	const {
		id,
		profile: { name: profileName },
		metadata: { name },
		stats: { totalUpvotes },
		createdAt,
	} = video;
	return (
		<div
			className='rounded-md flex flex-row items-start gap-2 cursor-pointer w-full'
			onClick={() => {
				router
					.prefetch(`/watch/${id}`)
					.then((res) => router.push(`/watch/${id}`));
			}}
		>
			<VideoCover
				video={video}
				preview={false}
				className='min-w-[160px] max-h-[96px] w-full h-full aspect-video object-cover rounded-md'
			/>
			<div className='flex flex-col gap-1'>
				<div className='font-sans 2xl:text-sm font-semibold max-w-[200px] break-all text-xs'>
					{name?.slice(0, 60) || ''}
				</div>
				<div className='font-sans 2xl:text-sm text-xs font-semibold max-w-[200px] text-[#9b9b9b]'>
					{profileName?.slice(0, 64) || ''}
				</div>
				<div className='flex flex-row sm:flex-col 2xl:flex-row gap-2 sm:gap-0 2xl:gap-2 items-center 2xl:items-center sm:items-start text-xs 2xl:text-sm'>
					<div className='font-sans font-semibold text-[#9b9b9b]'>
						{totalUpvotes !== 1
							? `${totalUpvotes} likes`
							: `${totalUpvotes} like`}
					</div>
					<div className='w-1 h-1 rounded-full bg-[#9b9b9b] flex sm:hidden 2xl:flex' />
					<div className='font-sans font-semibold text-[#9b9b9b]'>
						{ISOTimeToTimeAgo(createdAt || '')}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecommendedVideoCard;
