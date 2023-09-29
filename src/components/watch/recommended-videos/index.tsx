import React from 'react';
import {
	useExplorePublications,
	PublicationTypes,
	PublicationMainFocus,
} from '@lens-protocol/react-web';
import { Button, Spin } from 'antd';
import toast from 'react-hot-toast';

// Components
import {
	RecommendedVideoCard,
	RecommendedVideoCardSkeleton,
} from '~/components/cards';

// Icons
import { LoadingOutlined } from '@ant-design/icons';

// Types
import type { Post } from '@lens-protocol/react-web';

const RecommendedVideos = () => {
	const {
		data: publications,
		loading,
		next,
	} = useExplorePublications({
		limit: 10,
		publicationTypes: [PublicationTypes.Post],
		metadataFilter: {
			restrictPublicationMainFocusTo: [PublicationMainFocus.Video],
		},
	});
	const [isNextLoading, setIsNextLoading] = React.useState<boolean>(false);

	const handleShowMore = () => {
		try {
			setIsNextLoading(true);
			next().catch((error) => {
				toast.error('Something went wrong');
				console.log(error);
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsNextLoading(false);
		}
	};

	if (loading)
		return (
			<div className='flex flex-col items-center gap-2'>
				{Array(10)
					.fill(1)
					.map((_, i) => (
						<RecommendedVideoCardSkeleton key={i} />
					))}
			</div>
		);

	if (publications)
		return (
			<div className='flex flex-col items-center gap-2'>
				<div className='flex w-full flex-col gap-2 px-2 lg:px-0'>
					{(publications as Post[]).map((video) => (
						<RecommendedVideoCard key={video.id} video={video} />
					))}
				</div>
				<Button
					type='text'
					size='large'
					className='my-4 bg-primary text-[1rem] font-medium text-white hover:!bg-[#2f55ebd0] hover:!text-white'
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
			</div>
		);
};

export default RecommendedVideos;
