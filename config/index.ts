import { DAppMetaData } from '@/types';

export const TW_CLIENT_ID = process.env.NEXT_PUBLIC_TW_CLIENT_ID || '';
export const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '';

export const AppMetadata: DAppMetaData = {
	name: 'app-name',
	url: 'https://app-url.com',
	description: 'app-description',
	logoUrl: 'https://app-url.com/logo.png',
	isDarkMode: false,
};
