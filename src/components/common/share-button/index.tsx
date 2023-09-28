import React from 'react';
import { Button } from 'antd';

// Components
import ShareModal from './share-modal';

// Icons
import { PiShareFatBold } from 'react-icons/pi';

export type ShareContentType = {
	title: string;
	url: string;
	twitterHashtags?: string[];
	emailSubject?: string;
};

export type Props = {
	content: ShareContentType;
};

const ShareButton = ({ content }: Props) => {
	const [modalOpen, setModalOpen] = React.useState(false);
	return (
		<>
			<Button
				type='text'
				icon={<PiShareFatBold size='20' color='#7e7e7e' />}
				className='flex items-center justify-center'
				onClick={() => setModalOpen(true)}
			/>
			<ShareModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				content={content}
			/>
		</>
	);
};

export default ShareButton;
