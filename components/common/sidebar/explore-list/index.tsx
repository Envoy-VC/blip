import React from 'react';
import { Button } from 'antd';

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

import { SidebarItem } from '..';

interface Props {
	sidebarOpen: boolean;
}

const ExploreList = ({ sidebarOpen }: Props) => {
	return (
		<div className='flex flex-col gap-1 '>
			<span className='text-[1rem] mt-2 font-sans font-medium m-2'>
				Explore
			</span>
			{ExploreItems.map((item, index) => (
				<Button
					key={index}
					className='flex flex-row gap-6 items-center'
					type='text'
					size='large'
				>
					{item.icon}
					<div
						className={`text-[1rem] font-medium ${!sidebarOpen && 'hidden'}`}
					>
						{item.name}
					</div>
				</Button>
			))}
		</div>
	);
};

const ExploreItems: SidebarItem[] = [
	{
		name: 'Trending',
		icon: <PiFire size={20} />,
	},
	{
		name: 'Music',
		icon: <PiMusicNote size={20} />,
	},
	{
		name: 'Podcasts',
		icon: <PiGooglePodcastsLogo size={20} />,
	},
	{
		name: 'Arts',
		icon: <PiImage size={20} />,
	},
	{
		name: 'Comedy',
		icon: <BiLaugh size={20} />,
	},
	{
		name: 'Sports',
		icon: <PiFootball size={20} />,
	},
	{
		name: 'Technology',
		icon: <PiCpu size={20} />,
	},
	{
		name: 'Food',
		icon: <PiHamburger size={20} />,
	},
	{
		name: 'Education',
		icon: <PiBooks size={20} />,
	},
	{
		name: 'Entertainment',
		icon: <PiFilmSlate size={20} />,
	},
];

export default ExploreList;
