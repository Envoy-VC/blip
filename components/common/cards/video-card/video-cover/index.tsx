import React from 'react';
import { Post } from '@lens-protocol/react-web';
import { Image, ImageProps } from 'antd';

import { getUrlFromURI, formatVideoDuration } from '@/utils';
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
	let videoDuration = video?.metadata?.attributes.find((attr) => {
		if (attr?.traitType === 'durationInSeconds') {
			return attr;
		}
	});
	let { src, alt } = getImageData();
	return (
		<div className='relative w-full'>
			{!!videoDuration && videoDuration?.value && (
				<div className='absolute bottom-0 right-0 z-10 m-3 rounded-lg bg-[#d3d3d38e] px-1 font-sans text-sm font-medium text-[#1d1d1d]'>
					{formatVideoDuration(videoDuration?.value)}
				</div>
			)}
			<Image alt={alt} src={src} fallback={VideoFallbackImage.src} {...props} />
		</div>
	);
};

export default VideoCover;
