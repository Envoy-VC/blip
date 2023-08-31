import React from 'react';
import type { ReactElement } from 'react';
import Layout from '@/components/common/layout';
import NestedLayout from '@/components/common/layout/nested-layout';
import type { NextPageWithLayout } from '../_app';

import { useActiveProfile } from '@lens-protocol/react-web';
import { Spin } from 'antd';

// Icons
import { LoadingOutlined } from '@ant-design/icons';

const Notifications: NextPageWithLayout = () => {
	const { data: activeProfile, loading, error } = useActiveProfile();
	if (loading)
		return (
			<div className='m-8 flex h-full w-full justify-center border-2'>
				<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
			</div>
		);

	if (!activeProfile && !loading)
		return (
			<div className='m-8 w-full text-center text-lg font-medium'>
				Sign-in with lens to see notifications
			</div>
		);

	if (!!activeProfile) return <>{activeProfile.name}</>;
};

Notifications.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<NestedLayout>{page}</NestedLayout>
		</Layout>
	);
};

export default Notifications;
