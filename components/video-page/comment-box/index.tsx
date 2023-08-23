import React from 'react';
import { Dropdown, Button, Input, ConfigProvider } from 'antd';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';

import { ProfileAvatar } from '@/components/common';

import { PiSmiley } from 'react-icons/pi';

const VideoCommentBox = () => {
	const [comment, setComment] = React.useState<string>('');
	return (
		<div className='flex flex-row items-start gap-3'>
			<div className='max-w-[40px]'>
				<ProfileAvatar picture={null} size={40} />
			</div>
			<div className='flex flex-col items-end gap-2 w-full'>
				<ConfigProvider
					theme={{
						token: { controlOutline: 'none', colorPrimaryHover: 'none' },
					}}
				>
					<Input
						placeholder='Add a comment'
						className=''
						onChange={(e) => setComment(e.target.value)}
						value={comment}
						suffix={
							<Dropdown
								dropdownRender={() => (
									<EmojiPicker
										emojiStyle={EmojiStyle.TWITTER}
										onEmojiClick={(emoji) => {
											setComment(comment + emoji.emoji);
										}}
										lazyLoadEmojis
										width={300}
										height={350}
										searchDisabled
									/>
								)}
								trigger={['click']}
								className='!p-0 flex items-center'
							>
								<Button type='text' icon={<PiSmiley size='24' />} />
							</Dropdown>
						}
					/>
				</ConfigProvider>
				{comment && (
					<Button
						type='text'
						shape='round'
						className='bg-primary hover:!bg-secondary text-white hover:!text-white text-[1rem] flex items-center justify-center !py-[18px]'
					>
						Comment
					</Button>
				)}
			</div>
		</div>
	);
};

export default VideoCommentBox;
