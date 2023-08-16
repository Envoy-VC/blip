import React from 'react';
import { Post } from '@lens-protocol/react-web';
import { Image, ImageProps } from 'antd';

interface Props extends ImageProps {
	video: Post | null;
}

const VideoCover = ({ video, ...props }: Props) => {
	const [isVideo, setIsVideo] = React.useState<boolean>(false);
	const getIpfsUrl = (data: string) => {
		if (data.startsWith('ipfs://')) {
			return `https://ipfs.io/ipfs/${data.substring(7)}`;
		} else {
			return data;
		}
	};

	React.useEffect(() => {
		const checkIsVideo = async () => {
			let imgUrl = getImageUrl();
			let res = await fetch(imgUrl!).then((res) => res.blob());
			if (res.type.includes('video')) {
				setIsVideo(true);
			}
		};
		checkIsVideo();
	}, []);

	const getImageUrl = () => {
		let metadata = video?.metadata;
		if (metadata?.media !== undefined && metadata?.media.length > 0) {
			let media = metadata?.media.at(0);
			if (!!media?.original.cover) {
				return getIpfsUrl(media?.original.cover || '');
			} else {
				return getIpfsUrl(metadata.image || '');
			}
		}
	};

	const { className, height } = props;
	if (!isVideo) {
		return <Image alt='aaa' src={getImageUrl() || ''} {...props} />;
	} else {
		return (
			<video
				src={getImageUrl() || ''}
				className={`${className} max-h-[14rem]`}
				height={height}
				autoPlay={false}
				muted
				controls={false}
			/>
		);
	}
};

export default VideoCover;  
