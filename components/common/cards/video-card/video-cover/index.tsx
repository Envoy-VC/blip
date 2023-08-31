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
			return {
				src:
					videoMedia?.small?.cover ??
					videoMedia?.medium?.cover ??
					videoMedia?.optimized?.cover ??
					videoMedia?.original?.cover ??
					metadata?.image ??
					'',
				alt:
					videoMedia?.small?.altTag ??
					videoMedia?.medium?.altTag ??
					videoMedia?.optimized?.altTag ??
					videoMedia?.original?.altTag ??
					metadata?.content ??
					'',
			};
		};
		return getVideoCover();
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
			<Image
				alt={alt}
				src={getUrlFromURI(src)}
				fallback={VideoFallbackImage.src}
				{...props}
			/>
		</div>
	);
};

export default VideoCover;
