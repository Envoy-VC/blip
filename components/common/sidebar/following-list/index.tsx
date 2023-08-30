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
	<div className='my-1 flex flex-row items-center gap-2'>
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
			<div className='mx-2 flex flex-row items-center justify-between'>
				<span className='font-sans text-[1rem] font-medium'>Following</span>
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
						className='mx-2 w-full max-w-[10rem] rounded-lg py-1 text-[0.8rem]'
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
						className='group flex flex-row items-center justify-between gap-3 rounded-lg px-2 py-[6px]'
					>
						<div className='flex min-w-[36px] items-center justify-center rounded-full transition-all duration-300 ease-in-out group-hover:border-2 group-hover:border-primary'>
							<ProfileAvatar
								picture={follower.wallet.defaultProfile?.picture || null}
								size={30}
								shape='circle'
								width='30'
								height='30'
								className='m-[1px]'
							/>
						</div>
						<span className='font-sans text-[1rem] font-medium transition-all duration-300 ease-in-out group-hover:text-primary'>
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
					className='flex flex-row items-center gap-3 rounded-xl px-2 py-[6px]'
				>
					<PiCaretDown size={20} color='#0F61FF' />
					<span className='font-sans text-[1rem] font-semibold text-primary'>
						Show more
					</span>
				</Button>
			)}
		</>
	);
};

export default FollowingList;
