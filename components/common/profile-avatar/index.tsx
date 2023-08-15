import React from 'react';
import { Avatar, AvatarProps, Skeleton } from 'antd';
import { Profile } from '@lens-protocol/react-web';

import { PiUser } from 'react-icons/pi';

interface Props extends AvatarProps {
	picture: Profile['picture'];
	width?: string;
	height?: string;
}

interface RemoteProfilePictureProps extends AvatarProps {
	url: string;
}

interface NFTProfilePictureProps extends AvatarProps {
	uri: string;
	width?: string;
	height?: string;
}
interface LoadingSkeletonProps {
	width?: string;
	height?: string;
}

const resolveURI = (value: string) => {
	let url = value.startsWith('ipfs://')
		? `https://ipfs.io/ipfs/${value.slice(0, 7)}`
		: value.startsWith('ar://')
		? `https://arweave.net/${value.slice(5)}`
		: value;
	return url;
};

const LoadingProfilePicture = ({ width, height }: LoadingSkeletonProps) => (
	<Skeleton avatar active className={`w-[${width}px] h-[${height}px]`} />
);

const RemoteProfilePicture = ({ url, ...props }: RemoteProfilePictureProps) => {
	return <Avatar src={url} {...props} />;
};

const NFTImageRenderer = ({
	uri,
	width,
	height,
	...props
}: NFTProfilePictureProps) => {
	const [data, setData] = React.useState<string>();
	const [isLoading, setLoading] = React.useState<boolean>(true);
	const [error, setError] = React.useState<boolean>(false);

	React.useEffect(() => {
		try {
			const getNFTImage = async () => {
				const res = await fetch(resolveURI(uri)).then((res) => res.json());
				setData(resolveURI(res.image));
			};
			getNFTImage();
		} catch (error) {
			setError(true);
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, []);

	if (error) return <FallbackProfilePicture />;
	if (isLoading) return <LoadingProfilePicture width={width} height={height} />;
	return <Avatar src={data} {...props} />;
};

const FallbackProfilePicture = () => {
	return <PiUser size={32} />;
};

const ProfileAvatar = ({ picture, width, height, ...props }: Props) => {
	if (!picture) return <FallbackProfilePicture />;
	switch (picture.__typename) {
		case 'MediaSet':
			return (
				<RemoteProfilePicture url={picture.original.url} {...props} /> || (
					<LoadingProfilePicture width={width} height={height} />
				)
			);
		case 'NftImage':
			return <NFTImageRenderer uri={picture.uri} {...props} />;
		default:
			return <FallbackProfilePicture />;
	}
};

export default ProfileAvatar;
