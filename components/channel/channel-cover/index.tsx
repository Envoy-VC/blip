import React from 'react';
import { Profile } from '@lens-protocol/react-web';
import { Image, Skeleton } from 'antd';

interface Props {
	profile: Profile;
}

const CoverImageRenderer = ({
	coverPicture,
}: {
	coverPicture: Profile['coverPicture'];
}) => {
	switch (coverPicture?.__typename) {
		case 'MediaSet': {
			return (
				<Image
					src={coverPicture?.original.url}
					alt={coverPicture?.original?.altTag || ''}
					placeholder={<Skeleton.Image className='min-w-full' />}
					preview={false}
					className='min-w-full object-cover'
				/>
			);
		}
		case 'NftImage': {
			return (
				<Image
					src={coverPicture?.uri}
					alt=''
					placeholder={<Skeleton.Image className='min-w-full' />}
					preview={false}
					className='min-w-full object-cover'
				/>
			);
		}
		default:
			return (
				<Skeleton.Image className='min-h-[18rem] min-w-full object-cover' />
			);
	}
};

const ChannelCover = ({ profile }: Props) => {
	return (
		<div className='flex max-h-[18rem] w-full select-none items-center justify-center overflow-y-hidden'>
			<CoverImageRenderer coverPicture={profile?.coverPicture} />
		</div>
	);
};

export default ChannelCover;
