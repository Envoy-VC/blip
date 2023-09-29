import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../../_app';

import { useRouter } from 'next/router';
import { useProfile, useActiveProfile } from '@lens-protocol/react-web';
import { Skeleton } from 'antd';

import { ChannelPage } from '~/sections';
import { VideoCardSkeleton } from '~/components/cards';
import {
	ChannelDetailsSkeleton,
	ChannelCover,
	ChannelDetails,
} from '~/components/channel';

// Helpers
import { getChannelHandle } from '~/helpers/channel';

const Channel: NextPageWithLayout = () => {
	const router = useRouter();
	const { handle } = router.query;
	const { data: activeProfile } = useActiveProfile();
	const { data: profile, loading } = useProfile({
		handle: getChannelHandle(handle?.at(0) ?? ''),
		observerId: activeProfile?.id,
	});

	if (loading) {
		return (
			<div className='flex w-full flex-col'>
				<div className='flex max-h-[18rem] w-full select-none items-center justify-center overflow-y-hidden'>
					<Skeleton.Image className='min-h-[18rem] min-w-full object-cover' active />
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
	} else if (!loading && !!profile) {
		return (
			<div className='flex w-full flex-col'>
				<ChannelCover profile={profile} />
				<ChannelDetails profile={profile} />
				<ChannelPage profile={profile} />
			</div>
		);
	} else {
		return (
			<div className='w-full p-8 text-center text-xl font-medium'>
				Profile not found
			</div>
		);
	}
};

Channel.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Channel;
