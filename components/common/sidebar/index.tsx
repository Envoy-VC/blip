import React from 'react';
import { useRouter } from 'next/router';
import { useActiveProfile } from '@lens-protocol/react-web';
import { Button, Divider } from 'antd';

// Components
import FollowingList from './following-list';
import ExploreList from './explore-list';

// Icons
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
	const router = useRouter();
	const { data: profile } = useActiveProfile();

	const SidebarItems: SidebarItem[] = [
		{
			name: 'Home',
			icon: <PiHouseSimple size={20} />,
			handleClick: () => router.push('/'),
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

	return (
		<div
			className={`custom-scrollbar hidden h-[91.5vh] overflow-y-scroll p-4 pr-6 shadow-sm sm:flex ${
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
								onClick={item.handleClick}
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
					<div className='mx-2 flex flex-col gap-1'>
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

export default Sidebar;
