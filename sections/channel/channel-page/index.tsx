import React from 'react';
import {
	Profile,
	usePublications,
	PublicationMainFocus,
} from '@lens-protocol/react-web';

// Components
import { ChannelNavigation } from '@/components/channel';
import { VideoCard } from '@/components/common/cards';

interface Props {
	profile: Profile;
}

const ChannelPage = ({ profile }: Props) => {
	const {
		data: videos,
		loading,
		hasMore,
		next,
	} = usePublications({
		profileId: profile?.id,
		limit: 30,
		metadataFilter: {
			restrictPublicationMainFocusTo: [PublicationMainFocus.Video],
		},
	});

	return (
		<div className=''>
			<div className='px-4 mx-auto max-w-screen-2xl'>
				<ChannelNavigation />
				{videos !== undefined && (
					<div className='grid grid-cols-1 gap-4 my-12 2xl:grid-cols-4 md:grid-cols-2 xl:grid-cols-3'>
						{videos
							.filter((video) => video.__typename === 'Post')
							.map((video, i) => (
								<VideoCard key={i} publication={video} isOnChannelPage />
							))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ChannelPage;
