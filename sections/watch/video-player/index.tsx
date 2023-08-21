import React from 'react';
import Image from 'next/image';
import { Player } from '@livepeer/react';

const VideoPlayer = () => {
	return (
		<Player
			playbackId='f5eese9wwl88k4g8'
			showPipButton
			objectFit='cover'
			showTitle={false}
			aspectRatio='16to9'
		/>
	);
};

export default VideoPlayer;
