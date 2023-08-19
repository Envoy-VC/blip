import React from 'react';
import { Skeleton } from 'antd';

const PostCardSkeleton = () => {
	return (
		<div className='max-w-screen-md rounded-xl shadow-sm p-4 bg-[#dadada1c]'>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row justify-between items-center'>
					<div className='flex flex-row gap-2 items-center'>
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
