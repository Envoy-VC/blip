import React from 'react';
import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';

import { Spin } from 'antd';
import { useActiveProfile } from '@lens-protocol/react-web';

// Components
import { NotificationsPage } from '~/sections';

// Icons
import { LoadingOutlined } from '@ant-design/icons';

const Notifications: NextPageWithLayout = () => {
	const { data: activeProfile, loading } = useActiveProfile();
	if (loading) {
		return (
			<div className='m-8 flex h-full w-full justify-center border-2'>
				<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
			</div>
		);
	} else if (!loading && !!activeProfile) {
		return <NotificationsPage profileId={activeProfile.id} />;
	} else {
		return (
			<div className='m-8 w-full text-center text-lg font-medium'>
				Sign-in with lens to see notifications
			</div>
		);
	}
};

Notifications.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Notifications;
