import React from 'react';
import { useSearchParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
	PublicationMainFocus,
	FeedEventItemType,
	useFeed,
} from '@lens-protocol/react-web';

// Components
import { Spin } from 'antd';
import { VideoCard, VideoCardSkeleton } from '~/components/cards';

// Icons
import { LoadingOutlined } from '@ant-design/icons';

// Types
import type {
	ProfileId,
	PublicationMetadataFilters,
} from '@lens-protocol/react-web';

interface Props {
	feedProfileId: ProfileId;
}

const FeedVideos = ({ feedProfileId }: Props) => {
	const searchParams = useSearchParams();

	const hasFilterParam = searchParams.has('filter');
	const filterParam = searchParams.get('filter');

	const filter = () => {
		let filter: PublicationMetadataFilters;
		if (!hasFilterParam) {
			filter = {
				restrictPublicationMainFocusTo: [PublicationMainFocus.Video],
				restrictPublicationLocaleTo: navigator.language,
			};
		} else if (hasFilterParam && filterParam) {
			filter = {
				restrictPublicationMainFocusTo: [PublicationMainFocus.Video],
				restrictPublicationTagsTo: {
					oneOf: [filterParam],
				},
				restrictPublicationLocaleTo: navigator.language,
			};
		} else {
			filter = {
				restrictPublicationMainFocusTo: [PublicationMainFocus.Video],
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
		metadataFilter: filter(),
	});

	return (
		<>
			{loading && (
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
					{Array(16)
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
					scrollableTarget='scrollableDiv'
					loader={
						<div className='mx-auto w-fit pb-8'>
							<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
						</div>
					}
				>
					<div className='my-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
						{videos.map((video, i) => (
							<VideoCard key={i} publication={video.root} isOnChannelPage={false} />
						))}
					</div>
				</InfiniteScroll>
			)}
		</>
	);
};

export default FeedVideos;
