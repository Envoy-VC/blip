import React from 'react';
import Link from 'next/link';
import { ConfigProvider, Tooltip, theme, Button, Skeleton } from 'antd';
import { useProfile, Profile } from '@lens-protocol/react-web';
import { ProfileAvatar } from '../..';
import { formatFollowers } from '@/utils';

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
		<div className='p-2 flex flex-col gap-2'>
			<div className='flex flex-row justify-between'>
				<ProfileAvatar picture={picture} size={56} />
				<Button
					type='text'
					className='text-white bg-primary hover:!bg-primary hover:!text-white text-xs !py-0'
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
		<div className='p-2 flex flex-col gap-2'>
			<Skeleton.Avatar size={56} active />
			<Skeleton.Input style={{ width: 100 }} active size='small' />
			<Skeleton.Button style={{ width: 100, height: 24 }} active size='small' />
		</div>
	);
};

const ProfileTooltip = ({ children }: Props) => {
	const getHandle = () => {
		if (
			((children as any).at(0) as string).slice(1).toLowerCase() ===
			'lensprotocol'
		) {
			return 'lensprotocol';
		} else {
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
					borderRadius: 48,
				},
			}}
		>
			<Tooltip
				title={
					<>
						{loading && <ProfilePreviewSkeleton />}
						{!!profile && <ProfilePreview profile={profile} />}
						{!profile && !loading && (
							<div className='p-3'>Profile not found</div>
						)}
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
					className='bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-bold cursor-pointer'
					href={`${window.location.origin}/channel/${getHandle()}`}
				>
					{children}
				</Link>
			</Tooltip>
		</ConfigProvider>
	);
};

export default ProfileTooltip;
