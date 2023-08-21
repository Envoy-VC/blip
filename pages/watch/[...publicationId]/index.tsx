import React from 'react';
import type { ReactElement } from 'react';
import Layout from '@/components/common/layout';
import NestedLayout from '@/components/common/layout/nested-layout';
import type { NextPageWithLayout } from '../../_app';

import { VideoPlayer, VideoDetails, VideoComments } from '@/sections/watch';

const Watch: NextPageWithLayout = () => {
	return (
		<div className='flex flex-col lg:flex-row gap-8 w-full mx-8'>
			<div className='basis-3/4 w-full'>
				<div className='flex flex-col gap-1'>
					<VideoPlayer />
					<VideoDetails />
					<VideoComments />
				</div>
			</div>
			<div className='basis-1/4 w-full'></div>
		</div>
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
