import React from 'react';
import { Input, ConfigProvider, Avatar, Button } from 'antd';
import { PiCaretDown, PiMagnifyingGlass } from 'react-icons/pi';

const FollowingList = () => {
	const [searchBarOpen, setSearchBarOpen] = React.useState<boolean>(false);
	return (
		<>
			<div className='flex flex-row justify-between items-center mx-4'>
				<span className='text-[1rem] text-[#525252] font-sans font-medium'>
					Following
				</span>
				<Button
					icon={<PiMagnifyingGlass size={20} color='#737373' />}
					type='text'
					shape='circle'
					size='middle'
					onClick={() => setSearchBarOpen(!searchBarOpen)}
				/>
			</div>
			{searchBarOpen && (
				<ConfigProvider
					theme={{
						token: {
							controlOutline: 'none',
							colorPrimaryHover: 'none',
						},
					}}
				>
					<Input
						placeholder='Search'
						size='small'
						className='w-full rounded-lg py-1 text-[0.8rem] max-w-[10rem] mx-2'
					/>
				</ConfigProvider>
			)}
			{Array(5)
				.fill(1)
				.map((user, index) => (
					<div
						key={index}
						className='flex flex-row justify-between items-center gap-3 py-[6px] rounded-xl px-2 hover:!bg-[#0f5fff1c] cursor-pointer group'
					>
						<Avatar
							src='https://ik.imagekit.io/lens/media-snapshot/tr:w-60,h-60/76b1f278593adccb1eccdf3d3bce16fd20082a880ba61f73e3f77978e674be60.png'
							size={30}
							shape='circle'
						/>
						<span className='text-[1rem] font-semibold font-sans text-[#111827] group-hover:text-primary'>
							Envoy_
						</span>
						<span className='text-gray-500 text-sm font-sans group-hover:text-primary'>
							1.2k
						</span>
					</div>
				))}
			<Button
				type='link'
				className='flex flex-row items-center gap-3 py-[6px] rounded-xl px-2'
			>
				<PiCaretDown size={20} color='#0F61FF' />
				<span className='text-[1rem] font-semibold font-sans text-primary'>
					Show more
				</span>
			</Button>
		</>
	);
};

export default FollowingList;
