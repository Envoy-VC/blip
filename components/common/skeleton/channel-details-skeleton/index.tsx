import React from 'react';
import { Skeleton } from 'antd';

const ChannelDetailsSkeleton = () => {
	return (
		<div className='w-full p-4 mx-auto select-none max-w-screen-2xl'>
			<div className='flex flex-col items-start justify-between gap-8 md:items-center md:flex-row'>
				<div className='flex flex-row items-center gap-2'>
					<div className='max-w-[6.75rem]'>
						<Skeleton.Avatar shape='circle' size={96} active />
					</div>
					<div className='flex flex-col justify-center gap-1'>
						<Skeleton.Input style={{ width: 200 }} size='small' active />
						<Skeleton.Input style={{ width: 200 }} size='small' active />
						<Skeleton.Input style={{ width: 200 }} size='small' active />
					</div>
				</div>
				<div className='flex flex-row gap-4'>
					<Skeleton.Button
						shape='round'
						size='default'
						style={{ width: 108 }}
						active
					/>
					<Skeleton.Button
						shape='round'
						size='default'
						style={{ width: 108 }}
						active
					/>
				</div>
			</div>
		</div>
	);
};

export default ChannelDetailsSkeleton;
