import React from 'react';
import { Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
	usePublications,
	PublicationMainFocus,
	PublicationTypes,
	Profile,
} from '@lens-protocol/react-web';

// Components
import { VideoCard } from '@/components/common/cards';
import { VideoCardSkeleton } from '@/components/common/skeleton';

// Icons
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
	profile: Profile;
}

const ChannelHome = ({ profile }: Props) => {
	const {
		data: videos,
		loading,
		hasMore,
		next,
	} = usePublications({
		profileId: profile?.id,
		limit: 30,
		metadataFilter: {
			restrictPublicationMainFocusTo: [PublicationMainFocus.Video],
		},
		publicationTypes: [PublicationTypes.Post],
	});
	return (
		<>
			{loading && (
				<div className='my-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
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
					<div className='my-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
						{videos.map((video, i) => (
							<VideoCard key={i} publication={video} isOnChannelPage />
						))}
					</div>
				</InfiniteScroll>
			)}
		</>
	);
};

export default ChannelHome;
