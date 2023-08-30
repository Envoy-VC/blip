import React from 'react';
import {
	ProfileId,
	useActiveProfile,
	profileId,
} from '@lens-protocol/react-web';

// Components
import { FilterBar, FeedVideos, FeedSwitcher } from '@/components/feed';

const FeedPage = () => {
	const { data: activeProfile } = useActiveProfile();

	const [feedProfileId, setFeedProfileId] = React.useState<ProfileId>(
		activeProfile?.id || profileId('0x01')
	);
	const [tag, setTag] = React.useState<string>('all');
	return (
		<div className='grid grid-cols-1 place-content-start items-start'>
			<FilterBar tag={tag} setTag={setTag} />
			<FeedSwitcher />
			<FeedVideos tag={tag} setTag={setTag} feedProfileId={feedProfileId} />
		</div>
	);
};

export default FeedPage;
