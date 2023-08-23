import React from 'react';
import { Dropdown, Button, MenuProps } from 'antd';
import { VideoCommentBox, CommentPill } from '@/components/video-page';

// Icons
import { PiFunnelSimpleBold } from 'react-icons/pi';

const VideoComments = () => {
	const items: MenuProps['items'] = [
		{
			label: 'Top Comments',
			key: '0',
		},
		{
			label: 'Newest First',
			key: '1',
		},
	];

	return (
		<div className='flex flex-col gap-2 m-2 mb-8'>
			<div className='flex flex-row items-center justify-between'>
				<span className='font-sans font-medium text-lg'>271,987 Comments</span>
				<Dropdown menu={{ items }} trigger={['click']}>
					<Button
						type='text'
						className='flex flex-row gap-2 items-center'
						size='large'
					>
						<PiFunnelSimpleBold size='24' />
						<div className='sm:flex text-[1rem] hidden font-medium'>Filter</div>
					</Button>
				</Dropdown>
			</div>
			<VideoCommentBox />
			<div className='flex flex-col gap-2 my-2'>
				{Array(5)
					.fill(0)
					.map((_, i) => (
						<CommentPill key={i} />
					))}
			</div>
		</div>
	);
};

export default VideoComments;
