import React from 'react';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import Layout from '@/components/common/layout';
import NestedLayout from '@/components/common/layout/nested-layout';
import type { NextPageWithLayout } from '../../_app';

export const VideoContext = React.createContext<{
	post: Post | null;
}>({ post: null });

import { VideoPlayer, VideoDetails, VideoComments } from '@/sections/watch';
import { usePublication, Post, PublicationId } from '@lens-protocol/react-web';

const Watch: NextPageWithLayout = () => {
	const router = useRouter();
	const { publicationId: videoId } = router.query;
	const { data: publication, loading } = usePublication({
		publicationId: videoId!?.at(0) as PublicationId,
	});
	if (publication === undefined && !loading) {
		return <div>video not found</div>;
	}

	if (loading) {
		return <div>loading...</div>;
	}

	return (
		<VideoContext.Provider value={{ post: publication as Post }}>
			<div className='flex flex-col lg:flex-row gap-8 w-full mx-0 sm:mx-8 mt-4 sm:mt-0'>
				<div className='basis-3/4 w-full'>
					<div className='flex flex-col gap-1'>
						<VideoPlayer />
						<VideoDetails />
						<VideoComments />
					</div>
				</div>
				<div className='basis-1/4 w-full'></div>
			</div>
		</VideoContext.Provider>
	);
};

Watch.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<NestedLayout>{page}</NestedLayout>
		</Layout>
	);
};

export default Watch;
