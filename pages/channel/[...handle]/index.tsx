import type { ReactElement } from 'react';
import Layout from '@/components/common/layout';
import NestedLayout from '@/components/common/layout/nested-layout';
import type { NextPageWithLayout } from '../../_app';

import { useRouter } from 'next/router';
import { useProfile } from '@lens-protocol/react-web';
import { ChannelCover } from '@/components/channel';
import { SEO } from '@/components/common';

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
				<div>details</div>
			</div>
		);
	} else {
		return <div>loading</div>;
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
