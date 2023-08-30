import React from 'react';
import { Skeleton } from 'antd';

const PostCardSkeleton = () => {
	return (
		<div className='max-w-screen-md rounded-xl bg-[#dadada1c] p-4 shadow-sm'>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<div className='flex flex-row items-center gap-2'>
						<Skeleton.Avatar size={48} active />
						<Skeleton.Button size='small' active />
					</div>
				</div>
				<Skeleton active />
				<Skeleton.Button size='small' active style={{ width: 150 }} />
			</div>
		</div>
	);
};

export default PostCardSkeleton;
