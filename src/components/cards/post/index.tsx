import React from 'react';

// Components
import InteractionBox from './interaction-box';
import { ProfileAvatar } from '~/components/common';

// Helpers
import { ISOTimeToTimeAgo } from '~/helpers/time';
import { formatFollowers } from '~/helpers/profile';
import { getUrlFromURI } from '~/helpers/video';

// Icons
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { Button, Image } from 'antd';

// Types
import type { Post } from '@lens-protocol/react-web';
interface Props {
	post: Post;
}

const PostCard = ({ post }: Props) => {
	const {
		profile: { picture, name },
		createdAt,
		metadata: { content, media },
		stats: { totalUpvotes, totalAmountOfComments, totalAmountOfMirrors },
	} = post;
	const [showMoreActive, setShowMoreActive] = React.useState(false);
	return (
		<div className='shadow- postContainer max-w-screen-md rounded-xl p-4'>
			<div className='flex flex-col gap-1'>
				<div className='flex flex-row items-center justify-between'>
					<div className='flex flex-row gap-2'>
						<div className='max-w-[3rem]'>
							<ProfileAvatar picture={picture ?? null} size={42} />
						</div>
						<div className='flex flex-col'>
							<span className='text-lg font-semibold'>{name}</span>
							<span className='text-sm font-medium text-[#aaa]'>
								{ISOTimeToTimeAgo(createdAt)}
							</span>
						</div>
					</div>
					<Button icon={<PiDotsThreeVerticalBold size={24} />} type='text' />
				</div>
				<div className='flex max-w-xl flex-col items-start gap-2 '>
					<p className='max-w-xs whitespace-pre-wrap break-words font-sans text-[1rem] font-medium sm:max-w-xl'>
						{content && content.length > 250 && !showMoreActive
							? content.slice(0, 250) + '...'
							: content}
					</p>
					{(content ?? '')?.length > 250 && (
						<Button
							type='link'
							onClick={() => setShowMoreActive(!showMoreActive)}
							className='!px-0'
						>
							{showMoreActive ? 'Show less' : 'Show more'}
						</Button>
					)}

					<div className='grid grid-cols-2 gap-4'>
						<Image.PreviewGroup>
							{media.length > 0 &&
								media
									.filter((m) => m?.original.mimeType?.startsWith('image'))
									.map((media, i) => {
										console.log(media);
										if (!!media.optimized?.url) {
											const ele = media.optimized;
											return (
												<Image
													key={i}
													src={getUrlFromURI(ele?.url || '')}
													alt={ele?.altTag ?? ''}
													className='aspect-square max-w-[256px] rounded-lg object-cover'
												/>
											);
										} else if (!!media.original?.url) {
											const ele = media.original;
											return (
												<Image
													key={i}
													src={getUrlFromURI(ele?.url || '')}
													alt={ele?.altTag ?? ''}
													className='aspect-square max-w-[256px] rounded-lg object-cover'
												/>
											);
										}
									})}
						</Image.PreviewGroup>
					</div>
				</div>
				<div className='flex flex-row items-center justify-between text-sm font-medium text-[#aaa]'>
					<div className='flex flex-row items-center gap-1'>
						<span>{formatFollowers(totalUpvotes)} likes</span>
						<div className='h-1 w-1 rounded-full bg-[#eee]' />
						<span>{formatFollowers(totalAmountOfComments)} comments</span>
					</div>
					<span>{formatFollowers(totalAmountOfMirrors)} mirrors</span>
				</div>
				<div className='w-full'>
					<InteractionBox />
				</div>
			</div>
		</div>
	);
};

export default PostCard;
