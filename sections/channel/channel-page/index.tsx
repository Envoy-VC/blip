import React from 'react';
import { Profile } from '@lens-protocol/react-web';

// Components
import { ChannelNavigation } from '@/components/channel';
import { ChannelHome, ChannelShorts } from '..';
interface Props {
	profile: Profile;
}

export type MenuItemType =
	| 'home'
	| 'shorts'
	| 'community'
	| 'channels'
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
			<div className='px-4 mx-auto max-w-screen-2xl'>
				<ChannelNavigation
					activeMenuItem={activeMenuItem}
					setActiveMenuItem={setActiveMenuItem}
				/>
				{activeMenuItem === 'home' && <ChannelHome profile={profile} />}
				{activeMenuItem === 'shorts' && <ChannelShorts profile={profile} />}
			</div>
		</div>
	);
};

export default ChannelPage;
