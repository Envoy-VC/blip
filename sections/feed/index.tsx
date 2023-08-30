import React from 'react';
import {
	ProfileId,
	useActiveProfile,
	profileId,
} from '@lens-protocol/react-web';

// Components
import { FilterBar, FeedVideos, FeedSwitcher } from '@/components/feed';

const FeedPage = () => {
	const { data: activeProfile, loading } = useActiveProfile();

	const [feedProfileId, setFeedProfileId] = React.useState<ProfileId>(
		profileId('0x01')
	);
	const [tag, setTag] = React.useState<string>('all');

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
			<div className='mx-4 grid grid-cols-1 place-content-start items-start gap-4'>
				<FilterBar tag={tag} setTag={setTag} />
				<FeedSwitcher
					feedProfileId={feedProfileId}
					setFeedProfileId={setFeedProfileId}
				/>
				<FeedVideos tag={tag} setTag={setTag} feedProfileId={feedProfileId} />
			</div>
		);
};

export default FeedPage;
