import React from 'react';
import { useRouter } from 'next/router';
import { motion, Variants } from 'framer-motion';
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

interface RevealVariantsProps {
	direction: 'x' | 'y';
	from: number;
	to?: number;
	duration?: number;
	delay?: number;
}

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

	const containerVariants: Variants = {
		opened: { width: '15rem' },
		closed: { width: '6.25rem' },
	};

	const revealVariants = ({
		direction,
		from,
		to = 0,
		duration = 0.25,
		delay = 0.3,
	}: RevealVariantsProps): Variants => {
		return {
			closed: {
				[direction]: from,
				opacity: 0,
				transition: {
					type: 'tween',
					duration,
					delay,
				},
			},
			open: {
				[direction]: to,
				opacity: 1,
				transition: {
					type: 'tween',
					duration,
					delay,
				},
			},
		};
	};

	return (
		<motion.div
			initial='opened'
			variants={containerVariants}
			animate={isOpen ? 'opened' : 'closed'}
			transition={{
				duration: 0.25,
				staggerChildren: 0.015,
				staggerDirection: isOpen ? 1 : -1,
			}}
			className={clsx(
				'sticky top-[8%] hidden max-h-screen min-w-fit overflow-y-scroll p-4 shadow-sm sm:flex',
				isOpen ? 'custom-scrollbar' : 'scrollbar-hide'
			)}
		>
			<div className='flex flex-col gap-2'>
				{SidebarItems.map((item, index) => {
					const { name, Icon } = item;
					if (item.name === 'divider')
						return (
							<motion.div
								key={index}
								animate={isOpen ? 'open' : 'closed'}
								variants={revealVariants({
									direction: 'y',
									from: -24,
									delay: 0.05 + 0.05 * index,
								})}
							>
								<Divider style={{ margin: '8px 0px', color: '#000' }} />
							</motion.div>
						);
					else if (Icon !== null)
						return (
							<Button
								className={clsx(
									'flex flex-row items-center gap-6',
									isOpen ? 'w-full' : 'w-fit'
								)}
								type='text'
								size='large'
								onClick={item.handleClick}
							>
								<Icon size={20} />
								<motion.div
									className={clsx('text-[1rem] font-medium', !isOpen && 'hidden')}
									key={index}
									animate={isOpen ? 'open' : 'closed'}
									variants={revealVariants({
										direction: 'y',
										from: -24,
										delay: 0.05 + 0.05 * index,
									})}
								>
									{name}
								</motion.div>
							</Button>
						);
				})}

				<motion.div
					className='mx-2 flex flex-col gap-1'
					animate={isOpen ? 'open' : 'closed'}
					variants={revealVariants({
						direction: 'y',
						from: -24,
						delay: 0.3,
					})}
				>
					{isOpen && (
						<>
							{profile && (
								<>
									<FollowingList profileId={profile.id} />
									<Divider style={{ margin: '8px 0px', color: '#000' }} />
								</>
							)}
							<ExploreList />
						</>
					)}
				</motion.div>
			</div>
		</motion.div>
	);
};

export default Sidebar;
