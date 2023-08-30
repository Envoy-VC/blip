import React from 'react';
import { Skeleton } from 'antd';

const RecommendedVideoCardSkeleton = () => {
	return (
		<div className='flex flex-row items-start gap-2 rounded-md'>
			<Skeleton.Image
				className='aspect-video h-full max-h-[96px] w-full min-w-[160px] rounded-md object-cover'
				active
			/>
			<div className='flex flex-col gap-1'>
				<Skeleton.Input style={{ width: '200px' }} active size='small' />
				<Skeleton.Input style={{ width: '100px' }} active size='small' />
			</div>
		</div>
	);
};

export default RecommendedVideoCardSkeleton;
