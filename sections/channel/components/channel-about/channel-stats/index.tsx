import React from 'react';
import { Profile } from '@lens-protocol/react-web';

import { formatFollowers } from '@/utils';

import { PiFlagBold, PiShareFatBold } from 'react-icons/pi';
import { Button } from 'antd';

interface Props {
	profile: Profile;
}

const ChannelStatistics = ({ profile }: Props) => {
	const {
		stats: { totalPosts, totalFollowers },
	} = profile;
	return (
		<div className='rounded-xl shadow-sm p-4 h-full'>
			<div className='flex flex-col gap-2'>
				<span className='text-xl font-semibold mb-4'>Statistics</span>
				<div className='flex flex-row items-center gap-2'>
					<span className='font-medium text-[1rem]'>Total Followers:</span>
					<span className='font-semibold'>
						{formatFollowers(totalFollowers)}
					</span>
				</div>
				<div className='flex flex-row items-center gap-2'>
					<span className='font-medium text-[1rem]'>Posts:</span>
					<span className='font-semibold'>{totalPosts}</span>
				</div>
				<div className='flex flex-row gap-2 items-center my-4'>
					<Button
						type='text'
						icon={<PiFlagBold size='20' color='#7e7e7e' />}
						className='flex items-center justify-center'
					/>
					<Button
						type='text'
						icon={<PiShareFatBold size='20' color='#7e7e7e' />}
						className='flex items-center justify-center'
					/>
				</div>
			</div>
		</div>
	);
};

export default ChannelStatistics;
