import React from 'react';
import { Modal, ConfigProvider, Input, Button } from 'antd';
import toast from 'react-hot-toast';

import {
	WhatsappShareButton,
	FacebookShareButton,
	EmailShareButton,
	TwitterShareButton,
	LinkedinShareButton,
	RedditShareButton,
	TelegramShareButton,
} from 'react-share';

import {
	WhatsappIcon,
	FacebookIcon,
	EmailIcon,
	TwitterIcon,
	LinkedinIcon,
	RedditIcon,
	TelegramIcon,
} from 'react-share';

import { ShareContentType } from '..';

interface Props {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	content: ShareContentType;
}

const ShareModal = ({ modalOpen, setModalOpen, content }: Props) => {
	const { title, url, twitterHashtags, emailSubject } = content;

	const handleModalState = (state: boolean) => {
		setModalOpen(state);
	};

	return (
		<ConfigProvider
			theme={{
				token: { borderRadiusLG: 24, colorTextDisabled: '#000' },
				components: {
					Modal: {
						titleFontSize: 20,
					},
				},
			}}
		>
			<Modal
				title='Share'
				open={modalOpen}
				onCancel={() => handleModalState(false)}
				footer={null}
			>
				<div className='flex flex-col gap-4 my-4'>
					<div className='flex flex-row gap-3 items-center overflow-y-scroll scrollbar-hide'>
						<WhatsappShareButton url={url} title={title}>
							<WhatsappIcon size={52} round />
						</WhatsappShareButton>
						<FacebookShareButton url={url} title={title}>
							<FacebookIcon size={52} round />
						</FacebookShareButton>
						<EmailShareButton
							url={url}
							title={title}
							subject={emailSubject || ''}
						>
							<EmailIcon size={52} round />
						</EmailShareButton>
						<TwitterShareButton
							url={url}
							title={title}
							hashtags={twitterHashtags || []}
						>
							<TwitterIcon size={52} round />
						</TwitterShareButton>
						<LinkedinShareButton url={url} title={title}>
							<LinkedinIcon size={52} round />
						</LinkedinShareButton>
						<RedditShareButton url={url} title={title}>
							<RedditIcon size={52} round />
						</RedditShareButton>
						<TelegramShareButton url={url} title={title}>
							<TelegramIcon size={52} round />
						</TelegramShareButton>
					</div>
					<Input
						suffix={
							<Button
								type='text'
								className='bg-primary hover:!bg-secondary text-white hover:!text-white flex items-center justify-center !px-5'
								shape='round'
								onClick={() => {
									navigator.clipboard.writeText(url).then(() =>
										toast('Copied to clipboard', {
											icon: '📋',
										})
									);
								}}
							>
								Copy
							</Button>
						}
						disabled
						size='middle'
						value={url}
						className='rounded-3xl'
					/>
				</div>
			</Modal>
		</ConfigProvider>
	);
};

export default ShareModal;
