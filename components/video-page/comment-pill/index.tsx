import React from 'react';
import { Button } from 'antd';

// Components
import { ProfileAvatar } from '@/components/common';
import { ContentRenderer } from '@/components/common';

// Icons
import { PiThumbsUp, PiThumbsDown } from 'react-icons/pi';

const CommentPill = () => {
	return (
		<div className='p-2 rounded-lg'>
			<div className='flex flex-row items-start gap-2'>
				<div>
					<ProfileAvatar picture={null} size={36} />
				</div>
				<div className='flex flex-col'>
					<div className='flex flex-row gap-2 text-sm font-sans'>
						<span className='font-semibold'>@dragonspike101</span>
						<span className='text-[#838383] font-medium'>3 days ago</span>
					</div>
					<div className='font-sans font-medium whitespace-pre-wrap break-words max-w-sm sm:max-w-full text-[0.9rem]'>
						<ContentRenderer>
							You could try to build a mini rollercoaster track for a small
							levitating train, using a type2 superconductor for the train and
							magnets for the rails. What would make it really cool is the fact
							that it could go on loops and upside down since a type2
							@lensprotocol @aaveaave @nader
						</ContentRenderer>
					</div>
					<div className='flex flex-ro gap-1'>
						<Button
							type='text'
							className='flex items-center justify-center gap-2 !text-sm font-medium font-sans !px-1'
							size='large'
							title='Like'
						>
							<PiThumbsUp size='16' />
							221
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
