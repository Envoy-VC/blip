import React from 'react';
import { useRouter } from 'next/router';
import { useActiveProfile } from '@lens-protocol/react-web';
import { Button, Divider } from 'antd';
import clsx from 'clsx';

// Components
import FollowingList from './following-list';
import ExploreList from './explore-list';

// Stores
import { useSidebarStore } from '~/stores';

// Icons
import {
	PiFilmStrip,
	PiSignature,
	PiHouseSimple,
	PiBookmarksSimple,
	PiVideo,
	PiDna,
	PiThumbsUp,
} from 'react-icons/pi';

// Types
import type { IconType } from 'react-icons';

export interface SidebarItem {
	name: string;
	Icon: IconType | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleClick?: () => any;
}

const Sidebar = () => {
	const { isOpen } = useSidebarStore();
	const router = useRouter();
	const { data: profile } = useActiveProfile();

	const SidebarItems: SidebarItem[] = [
		{
			name: 'Home',
			Icon: PiHouseSimple,
			handleClick: () => router.push('/'),
		},
		{
			name: 'Feed',
			Icon: PiSignature,
			handleClick: () => router.push('/feed'),
		},
		{
			name: 'Shorts',
			Icon: PiFilmStrip,
		},
		{
			name: 'Following',
			Icon: PiDna,
		},
		{
			name: 'divider',
			Icon: null,
		},
		{
			name: 'Bookmarks',
			Icon: PiBookmarksSimple,
		},
		{
			name: 'Your Videos',
			Icon: PiVideo,
		},
		{
			name: 'Liked Videos',
			Icon: PiThumbsUp,
		},
		{
			name: 'divider',
			Icon: null,
		},
	];

	return (
		<div
			className={clsx(
				'custom-scrollbar hidden h-full p-4 pr-6 shadow-sm sm:flex',
				isOpen && 'min-w-[14rem]'
			)}
		>
			<div className='flex flex-col gap-2'>
				{SidebarItems.map((item, index) => {
					const { name, Icon } = item;
					if (item.name === 'divider')
						return (
							<Divider style={{ margin: '8px 0px', color: '#000' }} key={index} />
						);
					else if (Icon !== null)
						return (
							<Button
								key={index}
								className='flex flex-row items-center gap-6'
								type='text'
								size='large'
								onClick={item.handleClick}
							>
								<Icon size={20} />
								<div className={clsx('text-[1rem] font-medium', !isOpen && 'hidden')}>
									{name}
								</div>
							</Button>
						);
				})}
				{isOpen && (
					<div className='mx-2 flex flex-col gap-1'>
						{profile && (
							<>
								<FollowingList profileId={profile.id} />
								<Divider style={{ margin: '8px 0px', color: '#000' }} />
							</>
						)}

						<ExploreList />
					</div>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
