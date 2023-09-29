export const getChannelHandle = (name: string): string => {
	if (name === 'lensprotocol') return 'lensprotocol';
	else return `${name}.lens`;
};
