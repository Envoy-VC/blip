import React from 'react';
import { Button, Input, ConfigProvider } from 'antd';
import { useActiveProfile } from '@lens-protocol/react-web';

// Components
import { ProfileAvatar } from '@/components/common';

// Icons
import {
	PiHeart,
	PiRepeat,
	PiBookmarkSimple,
	PiArrowFatRightFill,
} from 'react-icons/pi';

const InteractionBox = () => {
	const { data: profile } = useActiveProfile();
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex w-full flex-row items-center justify-between'>
				<div className='flex flex-row gap-1'>
					<Button type='text' icon={<PiHeart size={24} color='#aaa' />} />
					<Button type='text' icon={<PiRepeat size={24} color='#aaa' />} />
				</div>
				<Button
					type='text'
					icon={<PiBookmarkSimple size={24} color='#aaa' />}
				/>
			</div>
			<div className='flex flex-row items-center gap-3'>
				<div className='min-w-[42px]'>
					<ProfileAvatar picture={profile?.picture || null} size={42} />
				</div>
				<ConfigProvider
					theme={{
						token: {
							controlOutline: 'none',
							colorPrimaryHover: 'none',
						},
					}}
				>
					<Input.TextArea
						placeholder='Write your comment...'
						className='rounded-lg px-2 py-2 text-[0.875rem]'
					/>
				</ConfigProvider>
				<Button
					type='text'
					icon={<PiArrowFatRightFill size={22} color='#fff' />}
					className='flex items-center justify-center bg-primary !px-4 hover:!bg-secondary'
				/>
			</div>
		</div>
	);
};

export default InteractionBox;
