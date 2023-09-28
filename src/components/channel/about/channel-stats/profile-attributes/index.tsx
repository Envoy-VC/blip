import React from 'react';
import Link from 'next/link';
import { ProfileAttributes } from '@lens-protocol/react-web';

import { PiTwitterLogoFill, PiMapPinLine, PiGlobeSimple } from 'react-icons/pi';

interface Props {
	type: string;
	attributes: ProfileAttributes;
}

const AttributeData = [
	{
		key: 'location',
		icon: <PiMapPinLine />,
		label: 'Location',
		type: 'text',
	},
	{
		key: 'website',
		icon: <PiGlobeSimple />,
		label: 'Website',
		type: 'link',
	},
	{
		key: 'twitter',
		icon: <PiTwitterLogoFill color='#00A6E8' />,
		label: 'Twitter',
		type: 'link',
	},
];

const ProfileAttributes = ({ attributes, type }: Props) => {
	let content = attributes[type].toString();
	let attributeData = AttributeData.find((d) => d.key === type);

	const getLink = () => {
		if (type === 'website') {
			return content.includes('http') ? content : `https://${content}`;
		} else if (type === 'twitter') {
			return `https://twitter.com/${content}`;
		}
	};
	if (!attributeData) return <div />;

	return (
		<div className='flex flex-row items-center gap-2 text-[1rem] '>
			{attributeData.icon}
			<span className='font-sans font-medium'>
				{attributeData.label}:&nbsp;
			</span>
			{attributeData.type === 'text' && (
				<span className='font-sans'>{content}</span>
			)}
			{attributeData.type === 'link' && (
				<Link
					className='font-sans hover:text-primary hover:underline'
					href={getLink() || ''}
					target='_blank'
				>
					{content}
				</Link>
			)}
		</div>
	);
};

export default ProfileAttributes;
