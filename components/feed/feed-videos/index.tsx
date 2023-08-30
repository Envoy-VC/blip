import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
	PublicationMainFocus,
	FeedEventItemType,
	PublicationMetadataFilters,
	useFeed,
	ProfileId,
} from '@lens-protocol/react-web';

// Components
import { Spin } from 'antd';
import { VideoCard } from '@/components/common/cards';
import { VideoCardSkeleton } from '@/components/common/skeleton';

// Icons
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
	tag: string;
	setTag: React.Dispatch<React.SetStateAction<string>>;
	feedProfileId: ProfileId;
}

const FeedVideos = ({ tag, setTag, feedProfileId }: Props) => {
	const filter = (tag: string) => {
		let filter: PublicationMetadataFilters;
		if (tag === 'all') {
			filter = {
				restrictPublicationMainFocusTo: [PublicationMainFocus.Video],
				restrictPublicationLocaleTo: navigator.language,
			};
		} else {
			filter = {
				restrictPublicationMainFocusTo: [PublicationMainFocus.Video],
				restrictPublicationTagsTo: {
					oneOf: [tag],
				},
				restrictPublicationLocaleTo: navigator.language,
			};
		}
		return filter;
	};
	const {
		data: videos,
		loading,
		hasMore,
		next,
	} = useFeed({
		profileId: feedProfileId,
		restrictEventTypesTo: [FeedEventItemType.Post],
		limit: 30,
		metadataFilter: filter(tag),
	});

	return (
		<>
			{loading && (
				<div className='my-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
					{Array(4)
						.fill(1)
						.map((_, i) => (
							<VideoCardSkeleton key={i} />
						))}
				</div>
			)}
			{!!videos && (
				<InfiniteScroll
					dataLength={videos.length}
					next={next}
					hasMore={hasMore}
					loader={
						<div className='mx-auto w-fit pb-8'>
							<Spin
								indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}
							/>
						</div>
					}
				>
					<div className='my-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
						{videos.map((video, i) => (
							<VideoCard
								key={i}
								publication={video.root}
								isOnChannelPage={false}
							/>
						))}
					</div>
				</InfiniteScroll>
			)}
		</>
	);
};

export default FeedVideos;
