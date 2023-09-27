import React from 'react';
import { Button } from 'antd';
import clsx from 'clsx';

// Stores
import { useSidebarStore } from '~/stores';

// Icons
import {
	PiFire,
	PiMusicNote,
	PiGooglePodcastsLogo,
	PiImage,
	PiFootball,
	PiCpu,
	PiHamburger,
	PiBooks,
	PiFilmSlate,
} from 'react-icons/pi';

import { BiLaugh } from 'react-icons/bi';

// Types

import type { SidebarItem } from '..';

const ExploreList = () => {
	const { isOpen } = useSidebarStore();
	return (
		<div className='flex flex-col gap-1 '>
			<span className='m-2 mt-2 font-sans text-[1rem] font-medium'>Explore</span>
			{ExploreItems.map((item, index) => {
				const { name, Icon } = item;
				if (Icon)
					return (
						<Button
							key={index}
							className='flex flex-row items-center gap-6'
							type='text'
							size='large'
						>
							<Icon size={20} />
							<div className={clsx('text-[1rem] font-medium', !isOpen && 'hidden')}>
								{name}
							</div>
						</Button>
					);
			})}
		</div>
	);
};

const ExploreItems: SidebarItem[] = [
	{
		name: 'Trending',
		Icon: PiFire,
	},
	{
		name: 'Music',
		Icon: PiMusicNote,
	},
	{
		name: 'Podcasts',
		Icon: PiGooglePodcastsLogo,
	},
	{
		name: 'Arts',
		Icon: PiImage,
	},
	{
		name: 'Comedy',
		Icon: BiLaugh,
	},
	{
		name: 'Sports',
		Icon: PiFootball,
	},
	{
		name: 'Technology',
		Icon: PiCpu,
	},
	{
		name: 'Food',
		Icon: PiHamburger,
	},
	{
		name: 'Education',
		Icon: PiBooks,
	},
	{
		name: 'Entertainment',
		Icon: PiFilmSlate,
	},
];

export default ExploreList;
