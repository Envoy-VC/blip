import React from 'react';
import type { ReactElement } from 'react';
import Layout from '~/components/layout';
import type { NextPageWithLayout } from './_app';

import { useSearchParams } from 'next/navigation';

import InfiniteScroll from 'react-infinite-scroll-component';
import {
	PublicationMainFocus,
	useExplorePublications,
	PublicationTypes,
} from '@lens-protocol/react-web';

// Components
import { Spin } from 'antd';
import { FilterBar } from '~/components/common';
import { VideoCard } from '~/components/cards';
import { VideoCardSkeleton } from '~/components/cards';

// Icons
import { LoadingOutlined } from '@ant-design/icons';

// Types
import type {
	PublicationMetadataFilters,
	Post,
} from '@lens-protocol/react-web';

const Home: NextPageWithLayout = () => {
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
	} = useExplorePublications({
		publicationTypes: [PublicationTypes.Post],
		limit: 30,
		metadataFilter: filter(),
	});
	return (
		<div className='mx-0 grid grid-cols-1 place-content-start items-start sm:mx-4'>
			<FilterBar />
			<div className='flex flex-col overflow-auto px-0 sm:px-2'>
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
						scrollableTarget='scrollableDiv'
						loader={
							<div className='mx-auto w-fit pb-8'>
								<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
							</div>
						}
					>
						<div className='my-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
							{(videos as Post[]).map((video, i) => (
								<VideoCard key={i} publication={video} isOnChannelPage={false} />
							))}
						</div>
					</InfiniteScroll>
				)}
			</div>
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
