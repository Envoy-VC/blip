import React from 'react';
import { Profile } from '@lens-protocol/react-web';

// Components
import { ChannelNavigation } from '@/components/channel';
import {
	ChannelCommunity,
	ChannelHome,
	ChannelShorts,
	FollowingChannels,
	ChannelAbout,
} from '@/components/channel';
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
	const [activeMenuItem, setActiveMenuItem] =
		React.useState<MenuItemType>('home');
	return (
		<div className=''>
			<div className='mx-auto max-w-screen-2xl px-4'>
				<ChannelNavigation
					activeMenuItem={activeMenuItem}
					setActiveMenuItem={setActiveMenuItem}
				/>
				{activeMenuItem === 'home' && <ChannelHome profile={profile} />}
				{activeMenuItem === 'shorts' && <ChannelShorts profile={profile} />}
				{activeMenuItem === 'community' && (
					<ChannelCommunity profile={profile} />
				)}
				{activeMenuItem === 'following' && (
					<FollowingChannels profile={profile} />
				)}
				{activeMenuItem === 'about' && <ChannelAbout profile={profile} />}
			</div>
		</div>
	);
};

export default ChannelPage;
