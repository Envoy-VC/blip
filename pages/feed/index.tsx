import React from 'react';
import type { ReactElement } from 'react';
import Layout from '@/components/common/layout';
import NestedLayout from '@/components/common/layout/nested-layout';
import type { NextPageWithLayout } from '../_app';

import FeedPage from '@/sections/feed';

const Feed: NextPageWithLayout = () => {
	return (
		<>
			<FeedPage />
		</>
	);
};

Feed.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<NestedLayout>{page}</NestedLayout>
		</Layout>
	);
};

export default Feed;
