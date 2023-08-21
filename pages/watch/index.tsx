import React from 'react';
import type { ReactElement } from 'react';
import Layout from '@/components/common/layout';
import NestedLayout from '@/components/common/layout/nested-layout';
import type { NextPageWithLayout } from '../_app';

import { useRouter } from 'next/router';
import { Input, Space, Button } from 'antd';
import { PiArrowFatRightFill } from 'react-icons/pi';

const Watch: NextPageWithLayout = () => {
	const router = useRouter();
	const [searchInput, setSearchInput] = React.useState<string>('');
	return (
		<div className='p-8 mx-auto border-2'>
			<span className=' text-lg font-medium font-sans'>
				Enter a Publication Id to watch a Video
			</span>
			<Space.Compact style={{ width: '100%' }} className='my-4'>
				<Input
					placeholder='Publication Id'
					className='max-w-sm'
					size='large'
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<Button
					type='primary'
					size='large'
					className='bg-primary'
					onClick={() => {
						router.push(`/watch/${searchInput}`);
					}}
				>
					<PiArrowFatRightFill size='24' />
				</Button>
			</Space.Compact>
		</div>
	);
};

Watch.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<NestedLayout>{page}</NestedLayout>
		</Layout>
	);
};

export default Watch;
