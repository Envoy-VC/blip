import React from 'react';
import { Skeleton } from 'antd';

const FollowingCardSkeleton = () => {
	return (
		<div className='flex flex-col justify-between w-fit p-4 items-center gap-1'>
			<Skeleton.Avatar active size={96} shape='circle' />
			<Skeleton.Button style={{ width: 128 }} active size='small' />
			<Skeleton.Input style={{ width: 64 }} active size='small' />
		</div>
	);
};

export default FollowingCardSkeleton;
