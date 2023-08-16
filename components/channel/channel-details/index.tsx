import React from 'react';
import { Button } from 'antd';
import { Profile } from '@lens-protocol/react-web';

// Components
import { ProfileAvatar } from '@/components/common';

// Utils
import { formatFollowers } from '@/utils';

// Icons
import { PiConfetti, PiPlus } from 'react-icons/pi';

interface Props {
	profile: Profile;
}

const ChannelDetails = ({ profile }: Props) => {
	return (
		<div className='w-full p-4 mx-auto max-w-screen-2xl'>
			<div className='flex flex-col items-center justify-between gap-8 md:flex-row'>
				<div className='flex flex-row items-center gap-2'>
					<div className='max-w-[6.75rem]'>
						<ProfileAvatar
							picture={profile?.picture || null}
							shape='circle'
							size={{ xs: 84, sm: 92, md: 96, lg: 100, xl: 108, xxl: 108 }}
						/>
					</div>
					<div className='flex flex-col justify-center'>
						<span className='text-2xl font-semibold'>
							{profile?.name || ''}
						</span>
						<div className='flex flex-row text-[#aaa] font-medium font-sans gap-2 text-sm sm:text-[1rem]'>
							<span>@{profile?.handle}</span>
							<span>
								{formatFollowers(profile?.stats?.totalFollowers || 0)}
							</span>
							<span>
								{formatFollowers(profile?.stats?.totalPosts || 0)} videos
							</span>
						</div>
						<div className='flex flex-row gap-2 font-medium'>
							<div>{profile?.bio?.slice(0, 50)}</div>
						</div>
					</div>
				</div>
				<div className='flex flex-row gap-4'>
					<Button
						type='text'
						shape='round'
						className='bg-primary hover:!bg-secondary text-white hover:!text-white flex flex-row items-center justify-center gap-2'
						size='large'
					>
						<PiPlus size={24} />
						Follow
					</Button>
					<Button
						type='text'
						shape='round'
						size='large'
						className='flex flex-row items-center justify-center gap-2'
					>
						<PiConfetti size={24} />
						Say thanks
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ChannelDetails;
