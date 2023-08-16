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
					className='object-cover min-w-full'
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
					className='object-cover min-w-full'
				/>
			);
		}
		default:
			return (
				<Skeleton.Image className='object-cover min-w-full min-h-[18rem]' />
			);
	}
};

const ChannelCover = ({ profile }: Props) => {
	return (
		<div className='flex items-center overflow-y-hidden max-h-[18rem] w-full select-none justify-center'>
			<CoverImageRenderer coverPicture={profile?.coverPicture} />
		</div>
	);
};

export default ChannelCover;
