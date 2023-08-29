import React from 'react';
import { Tag, Button } from 'antd';
import { FilterContext } from '../layout/nested-layout/index';

// Data
import { tagsData } from '@/data';

// Icons
import { PiCaretRightBold, PiCaretLeftBold } from 'react-icons/pi';

const FilterBar = () => {
	const filterBarRef = React.useRef<HTMLDivElement>(null);
	const { tag, setTag } = React.useContext(FilterContext);

	const handleChange = (tag: string, checked: boolean) => {
		setTag(checked ? tag : 'all');
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

	return (
		<div className='flex flex-row items-center mx-4 gap-2'>
			<Button
				type='text'
				icon={<PiCaretLeftBold size={16} />}
				shape='circle'
				className='w-fit'
				onClick={() => handleScroll('left')}
			/>
			<div
				className='overflow-x-scroll scrollbar-hide'
				ref={filterBarRef}
				style={{ scrollBehavior: 'smooth' }}
			>
				<div className='flex flex-row gap-2 '>
					{tagsData.map((tagData, index) => (
						<Tag.CheckableTag
							key={tagData.name}
							checked={tag === tagData.name}
							onChange={(checked) => handleChange(tagData.name, checked)}
							className='text-[1rem] font-semibold px-2 py-1'
						>
							{tagData.label}
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
