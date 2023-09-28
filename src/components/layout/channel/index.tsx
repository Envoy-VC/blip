import React from 'react';
import { useRouter } from 'next/router';
import { useProfile, useActiveProfile } from '@lens-protocol/react-web';
import { Skeleton } from 'antd';

// Components
import { ChannelNavigation } from '~/components/channel';
import {
	ChannelDetailsSkeleton,
	ChannelCover,
	ChannelDetails,
} from '~/components/channel';

// Helpers
import { getChannelHandle } from '~/helpers/channel';

// Types
interface ChannelProps {
	children: React.ReactNode;
}

const ChannelLayout = ({ children }: ChannelProps) => {
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
			</div>
		);
	} else if (!loading && !!profile) {
		return (
			<div className='flex w-full flex-col'>
				<ChannelCover profile={profile} />
				<ChannelDetails profile={profile} />
				<div className=''>
					<div className='mx-auto max-w-screen-2xl px-4'>
						<ChannelNavigation />
						{children}
					</div>
				</div>
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

export default ChannelLayout;
