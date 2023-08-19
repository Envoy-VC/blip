import React from 'react';
import { Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
	Profile,
	usePublications,
	PublicationTypes,
	PublicationMainFocus,
	Post,
} from '@lens-protocol/react-web';

import PostCard from '../post-card';
import PostCardSkeleton from '../post-card/skeleton';

import { LoadingOutlined } from '@ant-design/icons';

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

	if (!posts) {
		return (
			<div className='flex flex-col gap-2'>
				{Array(3)
					.fill(0)
					.map((_, i) => (
						<PostCardSkeleton key={i} />
					))}
			</div>
		);
	} else
		return (
			<div className='my-12'>
				<InfiniteScroll
					dataLength={posts.length}
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
