import React from 'react';
import { Avatar, Skeleton } from 'antd';

// Icons
import { PiUser } from 'react-icons/pi';

// Types
import type { AvatarSize } from 'antd/es/avatar/AvatarContext';
import type { Profile } from '@lens-protocol/react-web';
import type { AvatarProps } from 'antd';

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
	const url = value.startsWith('ipfs://')
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
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const res = await fetch(resolveURI(uri))
					.then((res) => res.json())
					.catch((err) => {
						setError(true);
					});
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
				setData(resolveURI(res.image));
			};
			if (uri.startsWith('ipfs://') || uri.startsWith('ar://')) {
				getNFTImage().catch((err) => {
					setError(true);
				});
			} else {
				setData(uri);
			}
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

interface FallbackProfilePictureProps {
	size?: AvatarSize;
}

const FallbackProfilePicture = ({ size }: FallbackProfilePictureProps) => {
	return <Avatar icon={<PiUser size={size as string | number} />} size={size} />;
};

const ProfileAvatar = ({ picture, width, height, ...props }: Props) => {
	const { size } = props;
	if (!picture) return <FallbackProfilePicture size={size} />;
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
			return <FallbackProfilePicture size={size} />;
	}
};

export default ProfileAvatar;
