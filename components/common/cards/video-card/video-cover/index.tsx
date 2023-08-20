import React from 'react';
import { Post } from '@lens-protocol/react-web';
import { Image, ImageProps } from 'antd';

import { getUrlFromURI } from '@/utils';
import VideoFallbackImage from '@/public/video-fallback.png';

interface Props extends ImageProps {
	video: Post | null;
}

const VideoCover = ({ video, ...props }: Props) => {
	const getImageData = (): { src: string; alt: string } => {
		let metadata = video?.metadata;
		let videoMedia = metadata?.media?.at(0);
		let getVideoCover = () => {
			if (!!videoMedia?.optimized?.cover) {
				return {
					src: getUrlFromURI(videoMedia?.optimized?.cover),
					alt: videoMedia?.optimized?.altTag || '',
				};
			} else if (!!videoMedia?.small?.cover) {
				return {
					src: getUrlFromURI(videoMedia?.small?.cover),
					alt: videoMedia?.small?.altTag || '',
				};
			} else if (!!videoMedia?.medium?.cover) {
				return {
					src: getUrlFromURI(videoMedia?.medium?.cover),
					alt: videoMedia?.medium?.altTag || '',
				};
			} else if (!!videoMedia?.original?.cover) {
				return {
					src: getUrlFromURI(videoMedia?.original?.cover),
					alt: videoMedia?.original?.altTag || '',
				};
			}
		};
		let videoCover = getVideoCover();
		if (!!videoCover) {
			return videoCover;
		} else {
			if (!!metadata?.image) {
				return {
					src: getUrlFromURI(metadata?.image),
					alt: metadata?.content || '',
				};
			} else {
				return {
					src: '',
					alt: '',
				};
			}
		}
	};
	let { src, alt } = getImageData();
	return (
		<Image alt={alt} src={src} fallback={VideoFallbackImage.src} {...props} />
	);
};

export default VideoCover;
