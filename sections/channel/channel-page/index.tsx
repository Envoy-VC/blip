import React from 'react';
import { Profile } from '@lens-protocol/react-web';

// Components
import { ChannelNavigation } from '@/components/channel';

interface Props {
	profile: Profile;
}

const ChannelPage = ({ profile }: Props) => {
	return (
		<div className=''>
			<div className='px-4 mx-auto max-w-screen-2xl'>
				<ChannelNavigation />
			</div>
		</div>
	);
};

export default ChannelPage;
