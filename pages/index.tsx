import React from 'react';
import type { ReactElement } from 'react';
import Layout from '@/components/common/layout';
import NestedLayout from '@/components/common/layout/nested-layout';
import type { NextPageWithLayout } from './_app';

import { FilterContext } from '@/components/common/layout/nested-layout';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
	PublicationMainFocus,
	PublicationTypes,
	useExplorePublications,
	PublicationMetadataFilters,
} from '@lens-protocol/react-web';

// Components
import { Spin } from 'antd';
import { FilterBar } from '@/components/common';
import { VideoCard } from '@/components/common/cards';
import { VideoCardSkeleton } from '@/components/common/skeleton';

// Icons
import { LoadingOutlined } from '@ant-design/icons';

const Home: NextPageWithLayout = () => {
	const { tag, setTag } = React.useContext(FilterContext);

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
	} = useExplorePublications({
		publicationTypes: [PublicationTypes.Post],
		limit: 30,

		metadataFilter: filter(tag),
	});
	return (
		<div className='grid grid-cols-1 place-content-start items-start'>
			<FilterBar />
			<div className='flex flex-col px-2'>
				{loading && (
					<div className='my-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
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
									publication={video}
									isOnChannelPage={false}
								/>
							))}
						</div>
					</InfiniteScroll>
				)}
			</div>
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<NestedLayout>{page}</NestedLayout>
		</Layout>
	);
};

export default Home;
