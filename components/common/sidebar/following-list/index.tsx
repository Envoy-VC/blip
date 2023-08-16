import React from 'react';
import { Input, ConfigProvider, Skeleton, Button } from 'antd';

import { ProfileId, useProfileFollowers } from '@lens-protocol/react-web';

import { PiCaretDown, PiMagnifyingGlass } from 'react-icons/pi';
import { ProfileAvatar } from '../..';

import { formatFollowers } from '@/utils';

interface FollowingListProps {
	profileId: ProfileId;
}

const ProfileCardLoader = () => (
	<div className='flex flex-row items-center gap-2 my-1'>
		<Skeleton.Avatar shape='circle' active size={32} />
		<Skeleton.Button active size='small' shape='round' block />
	</div>
);

const FollowingList = ({ profileId }: FollowingListProps) => {
	const [searchBarOpen, setSearchBarOpen] = React.useState<boolean>(false);
	const {
		data: followers,
		loading,
		hasMore,
	} = useProfileFollowers({
		profileId,
		limit: 5,
	});
	return (
		<>
			<div className='flex flex-row items-center justify-between mx-2'>
				<span className='text-[1rem] font-sans font-medium'>Following</span>
				<Button
					icon={<PiMagnifyingGlass size={20} />}
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
			{followers === undefined &&
				loading &&
				Array(5)
					.fill(1)
					.map((_, i) => <ProfileCardLoader key={i} />)}
			{followers !== undefined &&
				followers.map((follower, index) => (
					<Button
						key={index}
						type='text'
						size='large'
						className='flex flex-row justify-between items-center gap-3 py-[6px] rounded-lg px-2 group'
					>
						<div className='min-w-[36px] group-hover:border-2 group-hover:border-primary flex justify-center items-center rounded-full transition-all duration-300 ease-in-out'>
							<ProfileAvatar
								picture={follower.wallet.defaultProfile?.picture || null}
								size={30}
								shape='circle'
								width='30'
								height='30'
								className='m-[1px]'
							/>
						</div>
						<span className='text-[1rem] font-medium font-sans group-hover:text-primary transition-all duration-300 ease-in-out'>
							{follower.wallet.defaultProfile?.name?.slice(0, 10) || 'Unknown'}
						</span>
						<span className='font-sans text-sm text-gray-500 transition-all duration-300 ease-in-out group-hover:text-primary'>
							{formatFollowers(
								follower.wallet.defaultProfile?.stats.totalFollowers || 0
							)}
						</span>
					</Button>
				))}
			{hasMore && (
				<Button
					type='link'
					className='flex flex-row items-center gap-3 py-[6px] rounded-xl px-2'
				>
					<PiCaretDown size={20} color='#0F61FF' />
					<span className='text-[1rem] font-semibold font-sans text-primary'>
						Show more
					</span>
				</Button>
			)}
		</>
	);
};

export default FollowingList;
