import React from 'react';
import { useSearchParams } from 'next/navigation';

// Components
import { ChannelNavigation } from '~/components/channel';
import {
	ChannelHome,
	ChannelShorts,
	ChannelCommunity,
} from '~/components/channel';

/*
	FollowingChannels,
	ChannelAbout,
*/

// Types
import type { Profile } from '@lens-protocol/react-web';
interface Props {
	profile: Profile;
}

export type MenuItemType =
	| 'home'
	| 'shorts'
	| 'community'
	| 'following'
	| 'about';

export interface MenuItemProps {
	label: string;
	handleClick?: () => void;
}

const ChannelPage = ({ profile }: Props) => {
	const searchParams = useSearchParams();

	const hasFilterParam = searchParams.has('page');
	const pageParam = searchParams.get('page');
	return (
		<div className=''>
			<div className='mx-auto max-w-screen-2xl px-4'>
				<ChannelNavigation />
				{!hasFilterParam && <ChannelHome profile={profile} />}
				{pageParam === 'shorts' && <ChannelShorts profile={profile} />}

				{pageParam === 'community' && <ChannelCommunity profile={profile} />}
				{/*
				{activeMenuItem === 'following' && <FollowingChannels profile={profile} />}
	{activeMenuItem === 'about' && <ChannelAbout profile={profile} />}*/}
			</div>
		</div>
	);
};

export default ChannelPage;
