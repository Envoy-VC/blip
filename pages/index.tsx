import type { ReactElement } from 'react';
import Layout from '@/components/common/layout';
import NestedLayout from '@/components/common/layout/nested-layout';
import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
	return <p>Home Page</p>;
};

Home.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<NestedLayout>{page}</NestedLayout>
		</Layout>
	);
};

export default Home;
