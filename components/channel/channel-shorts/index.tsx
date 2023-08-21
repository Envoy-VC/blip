import React from 'react';
import { Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
	usePublications,
	PublicationMainFocus,
	Profile,
	PublicationTypes,
	AnyPublication,
	Post,
} from '@lens-protocol/react-web';

// Components
import { VideoCard } from '@/components/common/cards';
import { VideoCardSkeleton } from '@/components/common/skeleton';

// Icons
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
	profile: Profile;
}

const ChannelShorts = ({ profile }: Props) => {
	const {
		data: videos,
		loading,
		hasMore,
		next,
	} = usePublications({
		profileId: profile?.id,
		limit: 30,
		publicationTypes: [PublicationTypes.Post],
		metadataFilter: {
			restrictPublicationMainFocusTo: [PublicationMainFocus.Video],
		},
	});

	const [filteredVideos, setFilteredVideos] = React.useState<AnyPublication[]>(
		[]
	);

	React.useMemo(() => {
		let filteredVideos = (videos as Post[]).filter((video) => {
			let tag = video?.metadata?.attributes.find(
				(attr) => attr?.traitType === 'durationInSeconds'
			);
			if (!!tag && tag?.value) {
				let duration = parseFloat(tag.value);
				if (duration < 60) {
					return video;
				}
			}
		});
		setFilteredVideos(filteredVideos);
	}, [videos]);

	return (
		<>
			{loading && (
				<div className='grid grid-cols-1 gap-4 my-12 2xl:grid-cols-4 md:grid-cols-2 xl:grid-cols-3'>
					{Array(4)
						.fill(1)
						.map((_, i) => (
							<VideoCardSkeleton key={i} />
						))}
				</div>
			)}
			{!!filteredVideos && (
				<InfiniteScroll
					dataLength={videos!.length}
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
					<div className='grid grid-cols-1 gap-4 my-12 2xl:grid-cols-4 md:grid-cols-2 xl:grid-cols-3'>
						{filteredVideos.map((video, i) => (
							<VideoCard key={i} publication={video} isOnChannelPage />
						))}
					</div>
				</InfiniteScroll>
			)}
		</>
	);
};

export default ChannelShorts;
