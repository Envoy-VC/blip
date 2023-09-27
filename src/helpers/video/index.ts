export const getUrlFromURI = (uri: string) => {
	if (uri.startsWith('ipfs://')) {
		return `https://ipfs.io/ipfs/${uri.slice(7)}`;
	} else if (uri.startsWith('ar://')) {
		return `https://arweave.net/${uri.slice(5)}`;
	} else {
		return uri;
	}
};

export const formatVideoDuration = (duration: string) => {
	const seconds = parseInt(duration);
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secondsLeft = seconds % 60;
	if (hours > 0) {
		return `${hours}:${minutes.toString().padStart(2, '0')}:${secondsLeft
			.toString()
			.padStart(2, '0')}`;
	}
	return `${minutes}:${secondsLeft.toString().padStart(2, '0')}`;
};
