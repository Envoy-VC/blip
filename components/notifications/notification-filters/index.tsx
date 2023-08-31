import React from 'react';
import { Segmented } from 'antd';
import { IconType, IconBaseProps } from 'react-icons';

// Icons
import { PiBell, PiAt, PiChats, PiHeart, PiStack } from 'react-icons/pi';

interface OptionLabelProps {
	label: string;
	Icon: IconType;
	handleClick?: () => void;
}

const OptionLabel = ({ label, Icon, handleClick }: OptionLabelProps) => {
	return (
		<div className='my-auto flex flex-row items-center justify-center gap-2 select-none'>
			<Icon className='mt-1 h-6 w-6 sm:mt-0 sm:h-4 sm:w-4' />
			<div className='hidden text-[1rem] font-medium sm:flex'>{label}</div>
		</div>
	);
};

const NotificationFilters = () => {
	const FilterOptions: OptionLabelProps[] = [
		{
			label: 'All',
			Icon: PiBell,
		},
		{
			label: 'Mentions',
			Icon: PiAt,
		},
		{
			label: 'Comments',
			Icon: PiChats,
		},
		{
			label: 'Likes',
			Icon: PiHeart,
		},
		{
			label: 'Collects',
			Icon: PiStack,
		},
	];

	return (
		<Segmented
			options={FilterOptions.map((option) => {
				return {
					label: <OptionLabel label={option.label} Icon={option.Icon} />,
					value: option.label,
				};
			})}
			size='large'
			className='w-fit'
		/>
	);
};

export default NotificationFilters;
