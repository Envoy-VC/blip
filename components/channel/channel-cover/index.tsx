import React from 'react';
import { Profile } from '@lens-protocol/react-web';
import { Image } from 'antd';

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
					preview={false}
					className='object-cover min-w-full'
				/>
			);
		}
		default:
			return <Image src={''} alt='aaaa' />;
	}
};

const ChannelCover = ({ profile }: Props) => {
	return (
		<div className='flex items-center overflow-y-hidden max-h-[20rem] w-full border-2'>
			<CoverImageRenderer coverPicture={profile?.coverPicture} />
		</div>
	);
};

export default ChannelCover;
