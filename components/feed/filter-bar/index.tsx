import React from 'react';
import { Tag, Button } from 'antd';

// Data
import { tagsData } from '@/data';

// Icons
import { PiCaretRightBold, PiCaretLeftBold } from 'react-icons/pi';

interface Props {
	tag: string;
	setTag: React.Dispatch<React.SetStateAction<string>>;
}

const FilterBar = ({ tag, setTag }: Props) => {
	const filterBarRef = React.useRef<HTMLDivElement>(null);

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
		<div className='mx-4 flex flex-row items-center gap-2'>
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
					{tagsData.map((tagData, index) => (
						<Tag.CheckableTag
							key={tagData.name}
							checked={tag === tagData.name}
							onChange={(checked) => handleChange(tagData.name, checked)}
							className='px-2 py-1 text-[1rem] font-semibold'
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
