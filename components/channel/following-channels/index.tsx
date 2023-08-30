import React from 'react';
import { Spin } from 'antd';
import { Profile, useProfileFollowing } from '@lens-protocol/react-web';
import InfiniteScroll from 'react-infinite-scroll-component';

// Components
import FollowingUserCard from './following-card';
import FollowingCardSkeleton from './following-card/skeleton';

// Icons
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
	profile: Profile;
}

const FollowingChannels = ({ profile }: Props) => {
	const {
		data: following,
		loading,
		hasMore,
		next,
	} = useProfileFollowing({
		walletAddress: profile?.ownedBy,
		limit: 30,
	});
	if (!!following) {
		return (
			<InfiniteScroll
				dataLength={following.length}
				next={next}
				hasMore={hasMore}
				loader={
					<div className='mx-auto w-fit pb-8'>
						<Spin
							indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}
						/>
					</div>
				}
			>
				<div className='my-8 grid grid-cols-1 justify-items-center sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
					{following.map((following, index) => (
						<FollowingUserCard key={index} following={following} />
					))}
				</div>
			</InfiniteScroll>
		);
	}
	if (loading)
		return (
			<div className='my-8 grid grid-cols-1 justify-items-center sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
				{Array(12)
					.fill(1)
					.map((_, i) => (
						<FollowingCardSkeleton key={i} />
					))}
			</div>
		);
};

export default FollowingChannels;
