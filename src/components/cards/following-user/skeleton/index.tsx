import React from 'react';
import { Skeleton } from 'antd';

const FollowingCardSkeleton = () => {
	return (
		<div className='flex w-fit flex-col items-center justify-between gap-1 p-4'>
			<Skeleton.Avatar active size={96} shape='circle' />
			<Skeleton.Button style={{ width: 128 }} active size='small' />
			<Skeleton.Input style={{ width: 64 }} active size='small' />
		</div>
	);
};

export default FollowingCardSkeleton;
