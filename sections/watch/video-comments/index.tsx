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

	const [isNextLoading, setIsNextLoading] = React.useState<boolean>(false);

	const handleShowMore = async () => {
		try {
			setIsNextLoading(true);
			await next();
		} catch (error) {
			console.log(error);
		} finally {
			setIsNextLoading(false);
		}
	};

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
		<div className='m-2 mb-8 flex flex-col gap-2'>
			<div className='flex flex-row items-center justify-between'>
				<span className='font-sans text-lg font-medium'>
					{(comments?.length || 0) > 1
						? `${comments?.length} Comments`
						: `${comments?.length} Comment`}
				</span>
				<Dropdown menu={{ items }} trigger={['click']}>
					<Button
						type='text'
						className='flex flex-row items-center gap-2'
						size='large'
					>
						<PiFunnelSimpleBold size='24' />
						<div className='hidden text-[1rem] font-medium sm:flex'>Filter</div>
					</Button>
				</Dropdown>
			</div>
			<VideoCommentBox />
			{!comments ? (
				<div>loading...</div>
			) : (
				<div className='my-2 flex flex-col'>
					{(comments as Comment[]).map((comment) => (
						<CommentPill comment={comment} key={comment.id} />
					))}
				</div>
			)}
			{hasMore && (
				<Button
					type='text'
					size='large'
					className='my-4 w-fit bg-primary text-[1rem] font-medium text-white hover:!bg-[#2f55ebd0] hover:!text-white'
					onClick={handleShowMore}
				>
					{isNextLoading ? (
						<Spin
							indicator={
								<LoadingOutlined style={{ fontSize: 20, color: '#fff' }} spin />
							}
						/>
					) : (
						'Show More'
					)}
				</Button>
			)}
		</div>
	);
};

export default VideoComments;
