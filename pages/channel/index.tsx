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
			<div className='flex w-full flex-col'>
				<div className='flex max-h-[18rem] w-full select-none items-center justify-center overflow-y-hidden'>
					<Skeleton.Image
						className='min-h-[18rem] min-w-full object-cover'
						active
					/>
				</div>
				<ChannelDetailsSkeleton />
				<div className='mx-auto max-w-screen-2xl px-4'>
					<div className='my-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
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
			<div className='mx-auto p-16 text-lg font-semibold'>
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
