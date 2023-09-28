import React from 'react';
import { Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
	usePublications,
	PublicationTypes,
	PublicationMainFocus,
} from '@lens-protocol/react-web';

// Components
import { PostCard, PostCardSkeleton } from '~/components/cards';

// Icons
import { LoadingOutlined } from '@ant-design/icons';

// Types
import type { Post, Profile } from '@lens-protocol/react-web';
interface Props {
	profile: Profile;
}

const ChannelCommunity = ({ profile }: Props) => {
	const {
		data: posts,
		loading,
		hasMore,
		next,
	} = usePublications({
		profileId: profile?.id,
		limit: 5,
		publicationTypes: [PublicationTypes.Post],
		metadataFilter: {
			restrictPublicationMainFocusTo: [
				PublicationMainFocus.TextOnly,
				PublicationMainFocus.Image,
			],
		},
	});

	if (loading) {
		return (
			<div className='flex flex-col gap-2'>
				{Array(3)
					.fill(0)
					.map((_, i) => (
						<PostCardSkeleton key={i} />
					))}
			</div>
		);
	} else if (!loading && !!posts)
		return (
			<div className='my-12'>
				<InfiniteScroll
					dataLength={posts.length}
					next={next}
					hasMore={hasMore}
					scrollableTarget='scrollableDiv'
					loader={
						<div className='mx-auto w-fit pb-8'>
							<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
						</div>
					}
				>
					<div className='flex flex-col gap-2'>
						{(posts as Post[]).map((post) => (
							<PostCard post={post} key={post.id} />
						))}
					</div>
				</InfiniteScroll>
			</div>
		);
};

export default ChannelCommunity;
