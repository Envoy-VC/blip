import React from 'react';
import { Post } from '@lens-protocol/react-web';

// Components
import InteractionBox from './interaction-box';
import { ProfileAvatar } from '@/components/common';

// Utils
import { ISOTimeToTimeAgo, getUrlFromURI, formatFollowers } from '@/utils';

// Icons
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { Button, Image } from 'antd';

interface Props {
	post: Post;
}

const PostCard = ({ post }: Props) => {
	const {
		profile: { picture, name },
		createdAt,
		metadata: { content, image, media },
		stats: { totalUpvotes, totalAmountOfComments, totalAmountOfMirrors },
	} = post;
	const [showMoreActive, setShowMoreActive] = React.useState(false);
	return (
		<div className='max-w-screen-md rounded-xl shadow-sm p-4 bg-[#dadada1c]'>
			<div className='flex flex-col gap-1'>
				<div className='flex flex-row justify-between items-center'>
					<div className='flex flex-row gap-2'>
						<div className='max-w-[3rem]'>
							<ProfileAvatar picture={picture || null} size={42} />
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
				<div className='flex flex-col gap-2 max-w-xl items-start '>
					<p className='font-sans font-medium text-[1rem] whitespace-pre-wrap break-all'>
						{content && content.length > 250 && !showMoreActive
							? content.slice(0, 250) + '...'
							: content}
					</p>
					{(content || '')?.length > 250 && (
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
											let ele = media.optimized;
											return (
												<Image
													key={i}
													src={getUrlFromURI(ele?.url || '')}
													alt={ele?.altTag || ''}
													className='rounded-lg aspect-square object-cover max-w-[256px]'
												/>
											);
										} else if (!!media.original?.url) {
											let ele = media.original;
											return (
												<Image
													key={i}
													src={getUrlFromURI(ele?.url || '')}
													alt={ele?.altTag || ''}
													className='aspect-square object-cover rounded-lg max-w-[256px]'
												/>
											);
										}
									})}
						</Image.PreviewGroup>
					</div>
				</div>
				<div className='flex flex-row items-center justify-between text-sm font-medium text-[#aaa]'>
					<div className='flex flex-row gap-1 items-center'>
						<span>{formatFollowers(totalUpvotes)} likes</span>
						<div className='w-1 h-1 rounded-full bg-[#eee]' />
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
