import React from 'react';
import { Profile } from '@lens-protocol/react-web';

import ChannelDetails from './channel-details';
import ChannelStatistics from './channel-stats';

interface Props {
	profile: Profile;
}

const ChannelAbout = ({ profile }: Props) => {
	return (
		<div className='my-6 flex flex-col gap-6 lg:flex-row'>
			<div className='w-full basis-2/3'>
				<ChannelDetails profile={profile} />
			</div>
			<div className='w-full basis-1/3'>
				<ChannelStatistics profile={profile} />
			</div>
		</div>
	);
};

export default ChannelAbout;
