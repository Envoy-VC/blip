import React from 'react';
import { Button, Divider } from 'antd';

import { useActiveProfile } from '@lens-protocol/react-web';

import FollowingList from './following-list';
import ExploreList from './explore-list';

import {
	PiFilmStrip,
	PiHouseSimple,
	PiBookmarksSimple,
	PiVideo,
	PiDna,
	PiThumbsUp,
} from 'react-icons/pi';

interface Props {
	sidebarOpen: boolean;
	setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SidebarItem {
	name: string;
	icon?: React.ReactNode;
	handleClick?: () => void;
}

const Sidebar = ({ sidebarOpen }: Props) => {
	const { data: profile } = useActiveProfile();
	return (
		<div
			className={`p-4 overflow-y-scroll h-[91.5vh] custom-scrollbar shadow-sm hidden sm:flex ${
				sidebarOpen && 'min-w-[14rem]'
			}`}
		>
			<div className='flex flex-col gap-2'>
				{SidebarItems.map((item, index) => {
					if (item.name === 'divider')
						return (
							<Divider
								style={{ margin: '8px 0px', color: '#000' }}
								key={index}
							/>
						);
					else
						return (
							<Button
								key={index}
								className='flex flex-row items-center gap-6'
								type='text'
								size='large'
							>
								{item.icon}
								<div
									className={`text-[1rem] font-medium ${
										!sidebarOpen && 'hidden'
									}`}
								>
									{item.name}
								</div>
							</Button>
						);
				})}
				{sidebarOpen && (
					<div className='flex flex-col gap-1 mx-2'>
						{profile && (
							<>
								<FollowingList profileId={profile.id} />
								<Divider style={{ margin: '8px 0px', color: '#000' }} />
							</>
						)}

						<ExploreList sidebarOpen={sidebarOpen} />
					</div>
				)}
			</div>
		</div>
	);
};

const SidebarItems: SidebarItem[] = [
	{
		name: 'Home',
		icon: <PiHouseSimple size={20} />,
	},
	{
		name: 'Shorts',
		icon: <PiFilmStrip size={20} />,
	},
	{
		name: 'Following',
		icon: <PiDna size={20} />,
	},
	{
		name: 'divider',
	},
	{
		name: 'Bookmarks',
		icon: <PiBookmarksSimple size={20} />,
	},
	{
		name: 'Your Videos',
		icon: <PiVideo size={20} />,
	},
	{
		name: 'Liked Videos',
		icon: <PiThumbsUp size={20} />,
	},
	{
		name: 'divider',
	},
];

export default Sidebar;
