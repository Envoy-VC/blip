import React from 'react';
import type { ReactElement } from 'react';
import Layout from '~/components/layout';
import type { NextPageWithLayout } from '../_app';

import { useActiveProfile, profileId } from '@lens-protocol/react-web';

// Components
import { FilterBar } from '~/components/common';
import { FeedSwitcher, FeedVideos } from '~/components/feed';

// Types
import type { ProfileId } from '@lens-protocol/react-web';

const Feed: NextPageWithLayout = () => {
	const { data: activeProfile, loading } = useActiveProfile();

	const [feedProfileId, setFeedProfileId] = React.useState<ProfileId>(
		profileId('0x01')
	);

	React.useEffect(() => {
		if (!loading) {
			const feedProfileId = localStorage.getItem('feedProfileId');
			if (feedProfileId) {
				setFeedProfileId(profileId(feedProfileId));
			} else {
				if (!!activeProfile) {
					setFeedProfileId(activeProfile.id);
					localStorage.setItem('feedProfileId', activeProfile.id);
				} else {
					localStorage.setItem('feedProfileId', '0x01');
					setFeedProfileId(profileId('0x01'));
				}
			}
		}
	}, [activeProfile, loading]);

	if (!!feedProfileId)
		return (
			<div className='grid grid-cols-1 place-content-start items-start gap-4 sm:mx-4'>
				<FilterBar />
				<FeedSwitcher
					feedProfileId={feedProfileId}
					setFeedProfileId={setFeedProfileId}
				/>
				<FeedVideos feedProfileId={feedProfileId} />
			</div>
		);
};

Feed.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Feed;
