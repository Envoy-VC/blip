import React from 'react';
import { Button } from 'antd';
import { ProfileAvatar, ContentRenderer } from '@/components/common';
import { InteractionButtons } from '@/components/video-page';

const VideoDetails = () => {
	const [showDescription, setShowDescription] = React.useState<boolean>(false);
	return (
		<div className='flex flex-col m-2'>
			<span className='text-xl font-medium font-sans'>
				Every Country On Earth Fights For $250,000!
			</span>
			<div className='flex flex-row justify-between items-center'>
				<div className='flex flex-row gap-2 items-center'>
					<div>
						<ProfileAvatar picture={null} size={42} />
					</div>
					<div className='flex flex-col font-semibold font-sans'>
						<span className='text-lg'>MrBeast</span>
						<span className='text-sm text-[#aaa]'>1.2M followers</span>
					</div>
				</div>
				<InteractionButtons />
			</div>
			<div className='flex flex-col gap-1 my-4 items-start'>
				<span className='text-[1rem] font-medium font-sans'>Aug, 19 2023</span>
				<div className='font-sans font-medium whitespace-pre-wrap break-words max-w-sm sm:max-w-2xl text-[1rem]'>
					<ContentRenderer showFull={showDescription}>
						{content}
					</ContentRenderer>
				</div>
				<Button
					type='link'
					className='font-medium !px-0'
					onClick={() => setShowDescription(!showDescription)}
				>
					{showDescription ? 'Show less' : 'Show more'}
				</Button>
			</div>
		</div>
	);
};

export default VideoDetails;

const content = `Get my FREE gold skin for a limited time by playing the MrBeast event in Stumble Guys. https://stumbleguys.onelink.me/Zh4x/M...

Plus pre-register to be the first to play the MrBeast level on Xbox or PlayStation on www.stumbleguys.com @envoy1084

Thanks! https://fie.org


[abcde](https://www.youtube.com/watch?v=1JiJzqXxgxo)

New Merch - https://mrbeast.store

SUBSCRIBE OR I TAKE YOUR DOG
╔═╦╗╔╦╗╔═╦═╦╦╦╦╗╔═╗
║╚╣║║║╚╣╚╣╔╣╔╣║╚╣═╣ 
╠╗║╚╝║║╠╗║╚╣║║║║║═╣
╚═╩══╩═╩═╩═╩╝╚╩═╩═╝

----------------------------------------------------------------
follow all of these or i will kick you
• Facebook - https://www.facebook.com/MrBeast6000/
• Twitter - https://twitter.com/MrBeast
•  Instagram - https://www.instagram.com/mrbeast
•  Im Hiring! - https://www.mrbeastjobs.com/
--------------------------------------------------------------------`;
