import React from 'react';
import Link from 'next/link';
import { ConfigProvider, Tooltip, theme, Button, Skeleton } from 'antd';
import { useProfile } from '@lens-protocol/react-web';

// Components
import { ProfileAvatar } from '../..';

// Helpers
import { formatFollowers } from '~/helpers/profile';

// Types
import type { Profile } from '@lens-protocol/react-web';

interface Props {
	children: React.ReactNode | React.ReactNode[];
}

interface ProfilePreviewProps {
	profile: Profile;
}

const ProfilePreview = ({ profile }: ProfilePreviewProps) => {
	const {
		picture,
		name,
		handle,
		stats: { totalFollowers, totalFollowing },
	} = profile;
	return (
		<div className='flex flex-col gap-2 p-2'>
			<div className='flex flex-row justify-between'>
				<ProfileAvatar picture={picture} size={56} />
				<Button
					type='text'
					className='bg-primary !py-0 text-xs text-white hover:!bg-primary hover:!text-white'
				>
					Follow
				</Button>
			</div>
			<div className='flex flex-col'>
				<span className='text-[1rem] font-medium'>{name}</span>
				<span className='text-sm font-bold text-[#aaa] '>@{handle}</span>
			</div>
			<div className='flex flex-row gap-2'>
				<div>
					{formatFollowers(totalFollowing)}{' '}
					<span className='text-[#aaa]'>following</span>
				</div>
				<div>
					{formatFollowers(totalFollowers)}{' '}
					<span className='text-[#aaa]'>followers</span>
				</div>
			</div>
		</div>
	);
};

const ProfilePreviewSkeleton = () => {
	return (
		<div className='flex flex-col gap-2 p-2'>
			<Skeleton.Avatar size={56} active />
			<Skeleton.Input style={{ width: 100 }} active size='small' />
			<Skeleton.Button style={{ width: 100, height: 24 }} active size='small' />
		</div>
	);
};

const ProfileTooltip = ({ children }: Props) => {
	const getHandle = () => {
		if (
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
			((children as any).at(0) as string).slice(1).toLowerCase() === 'lensprotocol'
		) {
			return 'lensprotocol';
		} else {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
			return `${((children as any).at(0) as string).slice(1)}.lens`;
		}
	};

	const { data: profile, loading } = useProfile({
		handle: getHandle(),
	});
	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
				token: {
					borderRadius: 16,
				},
			}}
		>
			<Tooltip
				title={
					<>
						{loading && <ProfilePreviewSkeleton />}
						{!!profile && <ProfilePreview profile={profile} />}
						{!profile && !loading && <div className='p-3'>Profile not found</div>}
					</>
				}
				overlayClassName='rounded-2xl'
				overlayStyle={{
					borderRadius: '1rem',
				}}
				color='black'
				mouseEnterDelay={0.3}
				zIndex={10}
			>
				<Link
					className='cursor-pointer bg-gradient-to-r from-primary to-secondary bg-clip-text font-bold text-transparent'
					href={`${window.location.origin}/channel/${getHandle()}`}
				>
					{children}
				</Link>
			</Tooltip>
		</ConfigProvider>
	);
};

export default ProfileTooltip;
