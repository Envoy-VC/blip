import type { ReactElement } from 'react';
import Layout from '@/components/common/layout';
import NestedLayout from '@/components/common/layout/nested-layout';
import type { NextPageWithLayout } from '../../_app';

import { useRouter } from 'next/router';
import { useProfile } from '@lens-protocol/react-web';
import { Skeleton } from 'antd';

import { ChannelPage } from '@/sections/channel';
import { ChannelCover, ChannelDetails } from '@/components/channel';

import {
	VideoCardSkeleton,
	ChannelDetailsSkeleton,
} from '@/components/common/skeleton';

const Channel: NextPageWithLayout = () => {
	const router = useRouter();
	const { handle } = router.query;
	const { data: profile, loading } = useProfile({
		handle: (handle?.at(0) as string) || '',
	});

	if (profile) {
		return (
			<div className='flex flex-col w-full'>
				<ChannelCover profile={profile} />
				<ChannelDetails profile={profile} />
				<ChannelPage profile={profile} />
			</div>
		);
	} else {
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
