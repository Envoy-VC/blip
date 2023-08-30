import React from 'react';
import { Skeleton } from 'antd';

const VideoCardSkeleton = () => {
	return (
		<div className='flex flex-col rounded-lg'>
			<Skeleton.Image
				className='aspect-video rounded-lg'
				active
				style={{ height: 224, width: '100%' }}
			/>
			<div className='mt-2 flex w-fit flex-row items-start gap-3'>
				<Skeleton.Avatar shape='circle' size={42} active />
				<div className='flex flex-col gap-2'>
					<Skeleton.Input style={{ width: 280 }} size='small' active />
					<Skeleton.Input style={{ width: 180 }} size='small' active />
				</div>
			</div>
		</div>
	);
};

export default VideoCardSkeleton;
