import React from 'react';
import { Following } from '@lens-protocol/react-web';
import { Button } from 'antd';

import { ProfileAvatar } from '@/components/common';

import { formatFollowers } from '@/utils';
import Link from 'next/link';

interface Props {
	following: Following;
}

const FollowingUserCard = ({ following }: Props) => {
	const {
		profile: {
			picture,
			name,
			handle,
			stats: { totalFollowers },
		},
	} = following;
	return (
		<div className='flex flex-col justify-between w-fit p-4 items-center hover:-translate-y-[1px] hover:translate-x-[1px] rounded-2xl transition-all duration-200 ease-in-out shadow-sm px-6'>
			<div className='flex flex-col items-center mb-2'>
				<div className='max-w-[6rem]'>
					<ProfileAvatar size={96} picture={picture || null} />
				</div>
				<Link
					className='text-xl font-medium text-center max-w-[256px] hover:text-primary hover:underline'
					href={`${window.location.origin}/channel/${handle}`}
					target='_blank'
				>
					{name || handle}
				</Link>
				<span className='text-sm text-[#999999]'>{`${formatFollowers(
					totalFollowers || 0
				)} followers`}</span>
			</div>
			<Button type='text' className='font-medium text-[#aaa]' size='large'>
				Subscribe
			</Button>
		</div>
	);
};

export default FollowingUserCard;
