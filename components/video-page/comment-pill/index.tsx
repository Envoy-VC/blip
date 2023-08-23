import React from 'react';
import { Button } from 'antd';

// Components
import { ProfileAvatar } from '@/components/common';
import { ContentRenderer } from '@/components/common';

// Icons
import { PiThumbsUp, PiThumbsDown } from 'react-icons/pi';
import { Comment } from '@lens-protocol/react-web';

// Utils
import { ISOTimeToTimeAgo } from '@/utils';

interface Props {
	comment: Comment;
}

const CommentPill = ({ comment }: Props) => {
	const {
		createdAt,
		profile: { name, picture, handle },
		metadata: { content },
		stats: { totalUpvotes },
	} = comment;
	return (
		<div className='p-2 rounded-lg'>
			<div className='flex flex-row items-start gap-2'>
				<div>
					<ProfileAvatar picture={picture || null} size={36} />
				</div>
				<div className='flex flex-col'>
					<div className='flex flex-row gap-2 text-sm font-sans'>
						<span className='font-semibold'>{handle}</span>
						<span className='text-[#838383] font-medium'>
							{ISOTimeToTimeAgo(createdAt || '')}
						</span>
					</div>
					<div className='font-sans font-medium whitespace-pre-wrap break-words max-w-sm sm:max-w-full text-[0.9rem]'>
						<ContentRenderer>{content}</ContentRenderer>
					</div>
					<div className='flex flex-ro gap-1'>
						<Button
							type='text'
							className='flex items-center justify-center gap-2 !text-sm font-medium font-sans !px-1'
							size='large'
							title='Like'
						>
							<PiThumbsUp size='16' />
							{totalUpvotes || 0}
						</Button>
						<Button
							type='text'
							size='large'
							icon={<PiThumbsDown size='16' />}
							title='Dislike'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommentPill;
