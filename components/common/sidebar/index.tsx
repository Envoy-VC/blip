import React from 'react';
import { Button, Divider, Input, ConfigProvider, Avatar } from 'antd';

import {
	PiFilmStrip,
	PiHouseSimple,
	PiBookmarksSimple,
	PiVideo,
	PiDna,
	PiThumbsUp,
	PiMagnifyingGlass,
	PiCaretDown,
} from 'react-icons/pi';

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

interface Props {
	sidebarOpen: boolean;
	setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SidebarItem {
	name: string;
	icon?: React.ReactNode;
	handleClick?: () => void;
}

const ExploreItems: SidebarItem[] = [
	{
		name: 'Trending',
		icon: <PiFire size={20} color='#000' />,
	},
	{
		name: 'Music',
		icon: <PiMusicNote size={20} color='#000' />,
	},
	{
		name: 'Podcasts',
		icon: <PiGooglePodcastsLogo size={20} color='#000' />,
	},
	{
		name: 'Arts',
		icon: <PiImage size={20} color='#000' />,
	},
	{
		name: 'Comedy',
		icon: <BiLaugh size={20} color='#000' />,
	},
	{
		name: 'Sports',
		icon: <PiFootball size={20} color='#000' />,
	},
	{
		name: 'Technology',
		icon: <PiCpu size={20} color='#000' />,
	},
	{
		name: 'Food',
		icon: <PiHamburger size={20} color='#000' />,
	},
	{
		name: 'Education',
		icon: <PiBooks size={20} color='#000' />,
	},
	{
		name: 'Entertainment',
		icon: <PiFilmSlate size={20} color='#000' />,
	},
];

const Sidebar = ({ sidebarOpen, setSideBarOpen }: Props) => {
	const [searchBarOpen, setSearchBarOpen] = React.useState<boolean>(false);

	const SidebarItems: SidebarItem[] = [
		{
			name: 'Home',
			icon: <PiHouseSimple size={20} color='#000' />,
		},
		{
			name: 'Shorts',
			icon: <PiFilmStrip size={20} color='#000' />,
		},
		{
			name: 'Following',
			icon: <PiDna size={20} color='#000' />,
		},
		{
			name: 'divider',
		},
		{
			name: 'Bookmarks',
			icon: <PiBookmarksSimple size={20} color='#000' />,
		},
		{
			name: 'Your Videos',
			icon: <PiVideo size={20} color='#000' />,
		},
		{
			name: 'Liked Videos',
			icon: <PiThumbsUp size={20} color='#000' />,
		},
		{
			name: 'divider',
		},
	];
	return (
		<div
			className={`p-4 overflow-y-scroll h-[90vh] custom-scrollbar shadow-sm hidden sm:flex ${
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
								className='flex flex-row gap-6 items-center bg-white hover:!bg-[#0f5fff33]'
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
						<div className='flex flex-row justify-between items-center mx-4'>
							<span className='text-[1rem] text-[#525252] font-sans font-medium'>
								Following
							</span>
							<Button
								icon={<PiMagnifyingGlass size={20} color='#737373' />}
								type='text'
								shape='circle'
								size='middle'
								onClick={() => setSearchBarOpen(!searchBarOpen)}
							/>
						</div>
						{searchBarOpen && (
							<ConfigProvider
								theme={{
									token: {
										controlOutline: 'none',
										colorPrimaryHover: 'none',
									},
								}}
							>
								<Input
									placeholder='Search'
									size='small'
									className='w-full rounded-lg py-1 text-[0.8rem] max-w-[10rem] mx-2'
								/>
							</ConfigProvider>
						)}
						{Array(5)
							.fill(1)
							.map((user, index) => (
								<div
									key={index}
									className='flex flex-row justify-between items-center gap-3 py-[6px] rounded-xl px-2 hover:!bg-[#0f5fff1c] cursor-pointer group'
								>
									<Avatar
										src='https://ik.imagekit.io/lens/media-snapshot/tr:w-60,h-60/76b1f278593adccb1eccdf3d3bce16fd20082a880ba61f73e3f77978e674be60.png'
										size={30}
										shape='circle'
									/>
									<span className='text-[1rem] font-semibold font-sans text-[#111827] group-hover:text-primary'>
										Envoy_
									</span>
									<span className='text-gray-500 text-sm font-sans group-hover:text-primary'>
										1.2k
									</span>
								</div>
							))}
						<Button
							type='link'
							className='flex flex-row items-center gap-3 py-[6px] rounded-xl px-2'
						>
							<PiCaretDown size={20} color='#0F61FF' />
							<span className='text-[1rem] font-semibold font-sans text-primary'>
								Show more
							</span>
						</Button>
						<Divider style={{ margin: '8px 0px', color: '#000' }} />
						<div className='flex flex-col gap-1 '>
							<span className='text-[1rem] text-[#525252] mt-2 font-sans font-medium m-2'>
								Explore
							</span>
							{ExploreItems.map((item, index) => (
								<Button
									key={index}
									className='flex flex-row gap-6 items-center bg-white hover:!bg-[#0f5fff33]'
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
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
