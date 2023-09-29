import React from 'react';
import { Segmented } from 'antd';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

// Icons
import { PiBell, PiAt, PiChats, PiHeart, PiStack } from 'react-icons/pi';

// Types
import type { IconType } from 'react-icons';
import toast from 'react-hot-toast';

interface OptionLabelProps {
	label: string;
	Icon: IconType;
}

const OptionLabel = ({ label, Icon }: OptionLabelProps) => {
	return (
		<div className='my-auto flex select-none flex-row items-center justify-center gap-2'>
			<Icon className='mt-1 h-6 w-6 sm:mt-0 sm:h-4 sm:w-4' />
			<div className='hidden text-[1rem] font-medium sm:flex'>{label}</div>
		</div>
	);
};

const NotificationFilters = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const filterTag = searchParams.get('filter');

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
			label: 'Reactions',
			Icon: PiHeart,
		},
		{
			label: 'Collects',
			Icon: PiStack,
		},
	];

	const createQueryString = React.useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const onClick = (tag: string) => {
		if (tag === 'all') {
			router.push(pathname).catch((err) => {
				toast.error('Error changing filter');
				console.log(err);
			});
			return;
		}
		router
			.push(pathname + '?' + createQueryString('filter', tag))
			.catch((err) => {
				toast.error('Error changing filter');
				console.log(err);
			});
	};

	return (
		<Segmented
			options={FilterOptions.map((option) => {
				return {
					label: <OptionLabel label={option.label} Icon={option.Icon} />,
					value: option.label.toLocaleLowerCase(),
				};
			})}
			onChange={(value) => {
				onClick(value as string);
			}}
			value={filterTag ?? 'all'}
			size='large'
			className='w-fit'
		/>
	);
};

export default NotificationFilters;
