import React from 'react';
import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '~/pages/_app';

import { useSearchParams } from 'next/navigation';

export const VideoContext = React.createContext<{
	post: Post | null;
}>({ post: null });

import {
	VideoPlayer,
	VideoDetails,
	VideoComments,
	RecommendedVideos,
} from '~/components/watch';
/*
import {
	VideoPlayer,
	VideoDetails,
	VideoComments,
	RecommendedVideos,
} from '@/sections/watch';
*/
import { usePublication } from '@lens-protocol/react-web';

// Types
import type { Post, PublicationId } from '@lens-protocol/react-web';

const Watch: NextPageWithLayout = () => {
	const searchParams = useSearchParams();
	const videoId = searchParams.get('v');

	const { data: publication, loading } = usePublication({
		publicationId: (videoId as PublicationId) ?? '',
	});

	if (loading) {
		return <div>loading...</div>;
	} else if (!loading && !!publication) {
		return (
			<VideoContext.Provider value={{ post: publication as Post }}>
				<div className='mx-0 mt-4 flex w-full flex-col gap-8 sm:mx-8 sm:mt-0 lg:flex-row'>
					<div className='w-full basis-3/4'>
						<div className='flex flex-col gap-1'>
							<VideoPlayer />
							<VideoDetails />
							<VideoComments />
						</div>
					</div>
					<div className='w-full basis-1/4'>
						<RecommendedVideos />
					</div>
				</div>
			</VideoContext.Provider>
		);
	} else {
		return <div>video not found</div>;
	}
};

Watch.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Watch;
