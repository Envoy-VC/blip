import React from 'react';
import { Button } from 'antd';
import { Profile } from '@lens-protocol/react-web';
import toast from 'react-hot-toast';

import { ContentRenderer } from '@/components/common';

// Icons
import {
	PiCurrencyEth,
	PiCopySimpleBold,
	PiHash,
	PiIdentificationBadge,
} from 'react-icons/pi';
import Link from 'next/link';

import ProfileAttributes from '../channel-stats/profile-attributes';

interface Props {
	profile: Profile;
}

const ChannelDetails = ({ profile }: Props) => {
	const { id, bio, interests, attributes, onChainIdentity, ownedBy } = profile;

	const interestsArray = [
		...new Set(interests?.map((interest) => interest.split('_'))!.flat()),
	].filter((i) => i);

	const copyText = (content: string) => {
		navigator.clipboard.writeText(content).then(() =>
			toast('Copied to clipboard', {
				icon: '📋',
			})
		);
	};

	console.log(attributes);
	return (
		<div className='rounded-xl shadow-sm p-4'>
			<div className='flex flex-col gap-2'>
				<div className='flex flex-col gap-2'>
					<span className='text-xl font-semibold'>Description</span>
					<p className='text-[1rem] whitespace-pre-wrap break-words max-w-md'>
						<ContentRenderer>{bio}</ContentRenderer>
					</p>
				</div>
				<div className='border-[1px] my-2 border-[#eee]' />
				<div className='flex flex-col gap-[6px]'>
					<span className='text-xl font-semibold my-2 pb-2'>Details</span>
					<div className='flex flex-row gap-2 items-start'>
						<span className='text-[1rem] font-medium'>Interests: </span>
						<div className='flex flex-row gap-1 flex-wrap'>
							{interestsArray?.map((interest, index) => {
								return (
									<div
										key={index}
										className='text-sm p-1 px-2 rounded-3xl border-[#b1b1b1] border-[1px]'
									>
										{interest}
									</div>
								);
							})}
						</div>
					</div>

					{Object.keys(attributes).map((key, index) => (
						<ProfileAttributes key={index} attributes={attributes} type={key} />
					))}
				</div>
				<div className='border-[1px] my-2 border-[#eee]' />
				<div className='flex flex-col'>
					<span className='text-xl font-semibold my-2'>Others</span>
					<div className='flex flex-row gap-2 items-center text-[1rem] '>
						<PiCurrencyEth size='20' />
						<Link
							className='font-sans hover:underline hover:text-primary'
							href={`https://polygonscan.com/address/${ownedBy}`}
						>
							{ownedBy.slice(0, 5) + '...' + ownedBy.slice(-5)}
						</Link>
						<Button
							type='text'
							icon={<PiCopySimpleBold size='16' />}
							className='flex items-center justify-center'
							onClick={() => copyText(ownedBy)}
						/>
					</div>
					<div className='flex flex-row gap-2 items-center text-[1rem] '>
						<PiHash size='20' />
						<span className='font-sans'>{id}</span>
						<Button
							type='text'
							icon={<PiCopySimpleBold size='16' />}
							className='flex items-center justify-center'
							onClick={() => copyText(id)}
						/>
					</div>
					{!!onChainIdentity?.ens?.name && (
						<div className='flex flex-row gap-2 items-center text-[1rem] '>
							<PiIdentificationBadge size='20' />
							<Link
								className='font-sans hover:underline hover:text-primary'
								href={`https://app.ens.domains/${
									onChainIdentity?.ens?.name as string
								}`}
								target='_blank'
							>
								{onChainIdentity?.ens?.name as string}
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ChannelDetails;
