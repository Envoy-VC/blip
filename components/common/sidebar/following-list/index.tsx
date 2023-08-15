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
			{followers === undefined &&
				loading &&
				Array(5)
					.fill(1)
					.map((_, i) => <ProfileCardLoader key={i} />)}
			{followers !== undefined &&
				followers.map((follower, index) => (
					<div
						key={index}
						className='flex flex-row justify-between items-center gap-3 py-[6px] rounded-xl px-2 hover:!bg-[#0f5fff1c] cursor-pointer group'
					>
						<ProfileAvatar
							picture={follower.wallet.defaultProfile?.picture || null}
							size={30}
							shape='circle'
							width='30'
							height='30'
						/>
						<span className='text-[1rem] font-semibold font-sans text-[#111827] group-hover:text-primary'>
							{follower.wallet.defaultProfile?.name?.slice(0, 12) || 'Unknown'}
						</span>
						<span className='text-gray-500 text-sm font-sans group-hover:text-primary'>
							{formatFollowers(
								follower.wallet.defaultProfile?.stats.totalFollowers || 0
							)}
						</span>
					</div>
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
