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
		profile: { name: profileName, handle },
		metadata: { name },
		stats: { totalUpvotes },
		createdAt,
	} = video;
	return (
		<div
			className='flex w-full cursor-pointer flex-row items-start gap-2 rounded-md'
			onClick={() => {
				router
					.prefetch(`/watch/${id}`)
					.then((res) => router.push(`/watch/${id}`));
			}}
		>
			<VideoCover
				video={video}
				preview={false}
				className='aspect-video h-full max-h-[96px] w-full min-w-[160px] rounded-md object-cover'
				showDuration={false}
			/>
			<div className='flex flex-col gap-1'>
				<div className='max-w-[200px] break-all font-sans text-xs font-semibold 2xl:text-sm'>
					{name?.slice(0, 60) || ''}
				</div>
				<div className='max-w-[200px] font-sans text-xs font-semibold text-[#9b9b9b] 2xl:text-sm'>
					{profileName
						? profileName?.length > 60
							? `${profileName?.slice(0, 60)}...`
							: profileName
						: handle?.length > 60
						? `${handle?.slice(0, 60)}...`
						: handle}
				</div>
				<div className='flex flex-row items-center gap-2 text-xs sm:flex-col sm:items-start sm:gap-0 2xl:flex-row 2xl:items-center 2xl:gap-2 2xl:text-sm'>
					<div className='font-sans font-semibold text-[#9b9b9b]'>
						{totalUpvotes !== 1
							? `${totalUpvotes} likes`
							: `${totalUpvotes} like`}
					</div>
					<div className='flex h-1 w-1 rounded-full bg-[#9b9b9b] sm:hidden 2xl:flex' />
					<div className='font-sans font-semibold text-[#9b9b9b]'>
						{ISOTimeToTimeAgo(createdAt || '')}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecommendedVideoCard;
