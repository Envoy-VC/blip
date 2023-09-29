import React from 'react';
import { useActiveProfile } from '@lens-protocol/react-web';
import { Dropdown, Button, Input, ConfigProvider } from 'antd';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';

// Components
import { ProfileAvatar } from '~/components/common';

// Types
import { PiSmiley } from 'react-icons/pi';

const VideoCommentBox = () => {
	const { data: activeProfile } = useActiveProfile();
	const [comment, setComment] = React.useState<string>('');
	return (
		<div className='flex flex-row items-start gap-3'>
			<div className='max-w-[40px]'>
				<ProfileAvatar picture={activeProfile?.picture ?? null} size={40} />
			</div>
			<div className='flex w-full flex-col items-end gap-2'>
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
								className='flex items-center !p-0'
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
						className='flex items-center justify-center bg-primary !py-[18px] text-[1rem] text-white hover:!bg-secondary hover:!text-white'
					>
						Comment
					</Button>
				)}
			</div>
		</div>
	);
};

export default VideoCommentBox;
