import React from 'react';
import { Button } from 'antd';
import { Profile } from '@lens-protocol/react-web';

// Components
import { ShareButton } from '@/components/common';

// Utils
import { formatFollowers } from '@/utils';

// Icons
import { PiFlagBold } from 'react-icons/pi';

interface Props {
	profile: Profile;
}

const ChannelStatistics = ({ profile }: Props) => {
	const {
		name,
		stats: { totalPosts, totalFollowers },
	} = profile;
	return (
		<div className='h-full rounded-xl p-4 shadow-sm'>
			<div className='flex flex-col gap-2'>
				<span className='mb-4 text-xl font-semibold'>Statistics</span>
				<div className='flex flex-row items-center gap-2'>
					<span className='text-[1rem] font-medium'>Total Followers:</span>
					<span className='font-semibold'>
						{formatFollowers(totalFollowers)}
					</span>
				</div>
				<div className='flex flex-row items-center gap-2'>
					<span className='text-[1rem] font-medium'>Posts:</span>
					<span className='font-semibold'>{totalPosts}</span>
				</div>
				<div className='my-4 flex flex-row items-center gap-2'>
					<Button
						type='text'
						icon={<PiFlagBold size='20' color='#7e7e7e' />}
						className='flex items-center justify-center'
					/>
					<ShareButton
						content={{
							url: window.location.href,
							title: `Hey check out ${name}'s channel on Blip`,
							emailSubject: `Hey check out ${name}'s channel on Blip`,
							twitterHashtags: ['blip'],
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default ChannelStatistics;
