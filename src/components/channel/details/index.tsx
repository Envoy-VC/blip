import React from 'react';
import { Button } from 'antd';

// Components
import { ContentRenderer, ProfileAvatar } from '~/components/common';

// Utils
import { formatFollowers } from '~/helpers/profile';

// Icons
import { PiCheck, PiConfetti, PiPlus } from 'react-icons/pi';

// Types
import type { Profile } from '@lens-protocol/react-web';

interface Props {
	profile: Profile;
}

const ChannelDetails = ({ profile }: Props) => {
	return (
		<div className='mx-auto w-full max-w-screen-2xl p-2 md:p-4'>
			<div className='flex flex-col items-start justify-between gap-8 md:flex-row md:items-center'>
				<div className='flex w-full flex-col items-center gap-2 md:flex-row md:items-start'>
					<div className='max-w-[6.75rem]'>
						<ProfileAvatar
							picture={profile?.picture ?? null}
							shape='circle'
							size={{ xs: 84, sm: 92, md: 96, lg: 100, xl: 108, xxl: 108 }}
						/>
					</div>
					<div className='flex flex-col items-center justify-center md:items-start'>
						<span className='text-2xl font-semibold'>{profile?.name ?? ''}</span>
						<div className='flex flex-row gap-2 font-sans text-[0.8rem] font-medium text-[#aaa] sm:text-[1rem]'>
							<span>@{profile?.handle}</span>
							<span>
								{formatFollowers(profile?.stats?.totalFollowers || 0)} followers
							</span>
							<span>{formatFollowers(profile?.stats?.totalPosts || 0)} posts</span>
						</div>
						<div className='flex max-w-full flex-row gap-2 text-sm font-medium sm:max-w-[400px] md:max-w-[500px] md:text-[1rem]'>
							<ContentRenderer>{profile?.bio ?? ''}</ContentRenderer>
						</div>
					</div>
				</div>
				<div className='flex w-full flex-col justify-end gap-4 md:flex-row'>
					<Button
						type='text'
						shape='round'
						className='flex flex-row items-center justify-center gap-2 bg-primary text-white hover:!bg-secondary hover:!text-white'
						size='large'
					>
						{profile.isFollowedByMe ? (
							<div className='flex flex-row items-center justify-center gap-2'>
								<PiCheck size={24} />
								Following
							</div>
						) : (
							<div className='flex flex-row items-center justify-center gap-2'>
								<PiPlus size={24} />
								Follow
							</div>
						)}
					</Button>
					<Button
						type='default'
						shape='round'
						size='large'
						className='flex flex-row items-center justify-center gap-2 hover:!text-inherit'
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
