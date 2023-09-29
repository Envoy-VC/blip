import React from 'react';
import { ConfigProvider, Input, Tooltip } from 'antd';

// Icons
import { PiMagnifyingGlass, PiMicrophoneBold } from 'react-icons/pi';

const SearchBar = () => {
	return (
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
				prefix={<PiMagnifyingGlass size={16} color='#92959C' />}
				suffix={
					<Tooltip
						title='Voice search coming soon...'
						overlayInnerStyle={{
							fontWeight: 600,
							fontSize: '0.875rem',
							padding: '0.5rem 1rem',
						}}
					>
						<PiMicrophoneBold size={16} color='#474B57' />
					</Tooltip>
				}
				size='small'
				className='hidden max-w-[28rem] rounded-3xl px-4 py-2 text-[0.875rem] md:flex'
			/>
		</ConfigProvider>
	);
};

export default SearchBar;
