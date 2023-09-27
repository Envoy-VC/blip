/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { Tag, Button } from 'antd';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

// Data
import { tags } from '~/data/tags';

// Icons
import { PiCaretRightBold, PiCaretLeftBold } from 'react-icons/pi';

const FilterBar = () => {
	const filterBarRef = React.useRef<HTMLDivElement>(null);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const filterTag = searchParams.get('filter');

	const createQueryString = React.useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const handleChange = (name: string, checked: boolean) => {
		if (name === 'all') {
			router.push(pathname);
			return;
		}

		if (checked) {
			router.push(pathname + '?' + createQueryString('filter', name));
		} else {
			router.push(pathname);
		}
	};

	const handleScroll = (direction: 'right' | 'left') => {
		if (filterBarRef.current) {
			if (direction === 'right') {
				filterBarRef.current.scrollLeft += 300;
			} else {
				filterBarRef.current.scrollLeft -= 300;
			}
		}
	};

	const isChecked = (name: string) => {
		if (name === 'all' && filterTag === null) return true;
		if (name === filterTag) return true;
		else return false;
	};

	return (
		<div className='flex flex-row items-center gap-2'>
			<Button
				type='text'
				icon={<PiCaretLeftBold size={16} />}
				shape='circle'
				className='w-fit'
				onClick={() => handleScroll('left')}
			/>
			<div
				className='scrollbar-hide overflow-x-scroll'
				ref={filterBarRef}
				style={{ scrollBehavior: 'smooth' }}
			>
				<div className='flex flex-row gap-2 '>
					{tags.map((tag) => (
						<Tag.CheckableTag
							key={tag.name}
							checked={isChecked(tag.name)}
							onChange={(checked) => handleChange(tag.name, checked)}
							className='px-2 py-1 text-[1rem] font-semibold'
						>
							{tag.label}
						</Tag.CheckableTag>
					))}
				</div>
			</div>
			<Button
				type='text'
				icon={<PiCaretRightBold size={16} />}
				shape='circle'
				className='w-fit'
				onClick={() => handleScroll('right')}
			/>
		</div>
	);
};

export default FilterBar;
