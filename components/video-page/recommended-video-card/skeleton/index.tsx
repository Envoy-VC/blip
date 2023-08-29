import React from 'react';
import { Skeleton } from 'antd';

const RecommendedVideoCardSkeleton = () => {
	return (
		<div className='rounded-md flex flex-row items-start gap-2'>
			<Skeleton.Image
				className='min-w-[160px] max-h-[96px] w-full h-full aspect-video object-cover rounded-md'
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
