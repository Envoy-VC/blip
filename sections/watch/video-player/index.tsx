import React from 'react';
import { Player } from '@livepeer/react';

import { VideoContext } from '@/pages/watch/[...publicationId]';
import VideoCover from '@/components/common/cards/video-card/video-cover';

const VideoPlayer = () => {
	const { post } = React.useContext(VideoContext);
	return (
		<Player
			poster={<VideoCover video={post} preview={false} showDuration={false} />}
			playbackId={post!.metadata?.animatedUrl}
			showPipButton
			objectFit='cover'
			showTitle={false}
			aspectRatio='16to9'
		/>
	);
};

export default VideoPlayer;
