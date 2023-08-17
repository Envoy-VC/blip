import React from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/common/layout';
import NestedLayout from '@/components/common/layout/nested-layout';
import type { NextPageWithLayout } from '../_app';

import { Skeleton } from 'antd';
import { useActiveProfile } from '@lens-protocol/react-web';

import {
	VideoCardSkeleton,
	ChannelDetailsSkeleton,
} from '@/components/common/skeleton';

const Channel: NextPageWithLayout = () => {
	const router = useRouter();
	const { data: activeProfile, loading } = useActiveProfile();

	React.useEffect(() => {
		if (!loading && !!activeProfile) {
			router.replace(`/channel/${activeProfile.handle}`);
		}
	}, [activeProfile]);

	if (loading) {
		return (
			<div className='flex flex-col w-full'>
				<div className='flex items-center overflow-y-hidden max-h-[18rem] w-full select-none justify-center'>
					<Skeleton.Image
						className='object-cover min-w-full min-h-[18rem]'
						active
					/>
				</div>
				<ChannelDetailsSkeleton />
				<div className='px-4 mx-auto max-w-screen-2xl'>
					<div className='grid grid-cols-1 gap-4 my-12 2xl:grid-cols-4 md:grid-cols-2 xl:grid-cols-3'>
						{Array(8)
							.fill(0)
							.map((_, i) => (
								<VideoCardSkeleton key={i} />
							))}
					</div>
				</div>
			</div>
		);
	} else if (!loading || !!!activeProfile) {
		return (
			<div className='p-16 mx-auto text-lg font-semibold'>
				Sign-in with Lens to view your Channel
			</div>
		);
	}
};

Channel.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<NestedLayout>{page}</NestedLayout>
		</Layout>
	);
};

export default Channel;
