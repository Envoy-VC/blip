import React from 'react';
import { Profile } from '@lens-protocol/react-web';

import ChannelDetails from './channel-details';
import ChannelStatistics from './channel-stats';

interface Props {
	profile: Profile;
}

const ChannelAbout = ({ profile }: Props) => {
	return (
		<div className='flex flex-col lg:flex-row gap-6 my-6'>
			<div className='basis-2/3 w-full'>
				<ChannelDetails profile={profile} />
			</div>
			<div className='basis-1/3 w-full'>
				<ChannelStatistics profile={profile} />
			</div>
		</div>
	);
};

export default ChannelAbout;
