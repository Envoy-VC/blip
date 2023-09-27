import React from 'react';
import { Button, ConfigProvider } from 'antd';
import { useActiveWallet, useActiveProfile } from '@lens-protocol/react-web';

// Store
import { useWalletConnectionStore } from '~/stores';

// Components
import UserDropdown from './user-dropdown';
import WalletModal from './modal';
import Notifications from '~/components/common/navbar/notifications';
import ProfileAvatar from '../common/profile-avatar';

const ConnectButton = () => {
	const { isLoggingIn, setWalletModalOpen } = useWalletConnectionStore();

	const { data: wallet } = useActiveWallet();
	const { data: profile } = useActiveProfile();

	if (!!!wallet) {
		return (
			<>
				<ConfigProvider
					theme={{
						token: {
							colorTextDisabled: '#fff',
							colorBgContainerDisabled: '#3d81ffcc',
						},
					}}
				>
					<Button
						className='flex items-center !rounded-3xl border-none bg-[#3d81ff] !p-5 !px-8 !text-[1rem] text-white hover:!text-white'
						onClick={() => {
							setWalletModalOpen(true);
						}}
						disabled={isLoggingIn}
						size='large'
					>
						<div className='flex flex-row items-center justify-center gap-2'>
							<span>Connect</span>
						</div>
					</Button>
				</ConfigProvider>
				<WalletModal />
			</>
		);
	}
	if (!!profile)
		return (
			<div className='flex flex-row items-center gap-4'>
				<Notifications profileId={profile?.id} />
				<UserDropdown profile={profile}>
					<Button
						type='text'
						size='large'
						className='flex items-center justify-center !p-7 hover:!bg-transparent'
						icon={
							<div className='flex max-w-[46px] items-center justify-center rounded-full border-2 border-primary'>
								<ProfileAvatar
									picture={profile?.picture ?? null}
									width='42'
									height='42'
									size={{ xs: 42, sm: 42, md: 40, lg: 38, xl: 36, xxl: 36 }}
									className='m-[1px]'
									shape='circle'
								/>
							</div>
						}
					/>
				</UserDropdown>
			</div>
		);
};

export default ConnectButton;
