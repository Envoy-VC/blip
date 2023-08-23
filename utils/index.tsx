export const formatFollowers = (count: number) => {
	if (count < 1000) {
		return count;
	} else if (count < 1000000) {
		return (count / 1000).toFixed(1) + 'K';
	} else if (count < 1000000000) {
		return (count / 1000000).toFixed(1) + 'M';
	} else {
		return (count / 1000000000).toFixed(1) + 'B';
	}
};

export const ISOTimeToTimeAgo = (ISOTime: string) => {
	const time = new Date(ISOTime);
	const now = new Date();
	const diff = now.getTime() - time.getTime();
	const sec = Math.floor(diff / 1000);
	const min = Math.floor(sec / 60);
	const hour = Math.floor(min / 60);
	const day = Math.floor(hour / 24);
	const week = Math.floor(day / 7);
	const month = Math.floor(day / 30);
	const year = Math.floor(day / 365);

	if (year > 0) {
		return year === 1 ? '1 year ago' : `${year} years ago`;
	}
	if (month > 0) {
		return month === 1 ? '1 month ago' : `${month} months ago`;
	}
	if (week > 0) {
		return week === 1 ? '1 week ago' : `${week} weeks ago`;
	}
	if (day > 0) {
		return day === 1 ? '1 day ago' : `${day} days ago`;
	}
	if (hour > 0) {
		return hour === 1 ? '1 hour ago' : `${hour} hours ago`;
	}
	if (min > 0) {
		return min === 1 ? '1 min ago' : `${min} mins ago`;
	}
	if (sec > 0) {
		return sec === 1 ? '1 sec ago' : `${sec} secs ago`;
	}
	return 'just now';
};

export const ISOTimeToDay = (ISOTime: string) => {
	// format iso time to format Aug 19, 2023
	const time = new Date(ISOTime);
	const month = time.toLocaleString('default', { month: 'short' });
	const day = time.getDate();
	const year = time.getFullYear();
	return `${month} ${day}, ${year}`;
};

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
