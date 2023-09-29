import React from 'react';

import { Image } from 'antd';

import { getUrlFromURI, formatVideoDuration } from '~/helpers/video';
import VideoFallbackImage from '../../../../../public/video-fallback.png';

// Types
import type { Post } from '@lens-protocol/react-web';
import type { ImageProps } from 'antd';

interface Props extends ImageProps {
	video: Post | null;
	showDuration?: boolean;
}

const VideoCover = ({ video, showDuration = true, ...props }: Props) => {
	const getImageData = (): { src: string; alt: string } => {
		const metadata = video?.metadata;
		const videoMedia = metadata?.media?.at(0);
		const getVideoCover = () => {
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
	const videoDuration = video?.metadata?.attributes.find((attr) => {
		if (attr?.traitType === 'durationInSeconds') {
			return attr;
		}
	});
	const { src, alt } = getImageData();
	return (
		<div className='relative'>
			{!!videoDuration && videoDuration?.value && showDuration && (
				<div
					className={`absolute bottom-0 right-0 z-10 m-3 rounded-lg bg-[#d3d3d38e] px-1 font-sans text-sm font-medium text-[#1d1d1d]`}
				>
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
