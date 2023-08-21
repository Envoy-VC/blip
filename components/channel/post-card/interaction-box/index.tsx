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
			<div className='flex flex-row justify-between items-center w-full'>
				<div className='flex flex-row gap-1'>
					<Button type='text' icon={<PiHeart size={24} color='#aaa' />} />
					<Button type='text' icon={<PiRepeat size={24} color='#aaa' />} />
				</div>
				<Button
					type='text'
					icon={<PiBookmarkSimple size={24} color='#aaa' />}
				/>
			</div>
			<div className='flex flex-row gap-3 items-center'>
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
						className='rounded-lg py-2 px-2 text-[0.875rem]'
					/>
				</ConfigProvider>
				<Button
					type='text'
					icon={<PiArrowFatRightFill size={22} color='#fff' />}
					className='bg-primary hover:!bg-secondary !px-4 flex justify-center items-center'
				/>
			</div>
		</div>
	);
};

export default InteractionBox;
