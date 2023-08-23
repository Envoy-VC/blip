import React from 'react';
import { Dropdown, Button, MenuProps, Spin } from 'antd';
import { VideoContext } from '@/pages/watch/[...publicationId]';
import { Comment, PublicationId, useComments } from '@lens-protocol/react-web';
import InfiniteScroll from 'react-infinite-scroll-component';

// Components
import { VideoCommentBox, CommentPill } from '@/components/video-page';

// Icons
import { PiFunnelSimpleBold } from 'react-icons/pi';
import { LoadingOutlined } from '@ant-design/icons';

const VideoComments = () => {
	const { post } = React.useContext(VideoContext);
	const {
		data: comments,
		loading,
		hasMore,
		next,
	} = useComments({
		commentsOf: post?.id || ('' as PublicationId),
		limit: 10,
	});
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
				<span className='font-sans font-medium text-lg'>
					{(comments?.length || 0) > 1
						? `${comments?.length} Comments`
						: `${comments?.length} Comment`}
				</span>
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
			{!comments ? (
				<div>loading...</div>
			) : (
				<InfiniteScroll
					dataLength={comments.length}
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
					<div className='flex flex-col my-2'>
						{(comments as Comment[]).map((comment) => (
							<CommentPill comment={comment} key={comment.id} />
						))}
					</div>
				</InfiniteScroll>
			)}
		</div>
	);
};

export default VideoComments;
