import React from 'react';
import { Button, Badge, ConfigProvider } from 'antd';

import { useAccount } from 'wagmi';

import { useActiveWallet, useActiveProfile } from '@lens-protocol/react-web';

import UserDropdown from './user-dropdown';
import WalletModal from './wallet-modal';
import { Notifications } from '@/components/common';

import { PiVideoCamera } from 'react-icons/pi';
import { ProfileAvatar } from '..';

const ConnectButton = () => {
	const [walletModalOpen, setWalletModalOpen] = React.useState<boolean>(false);
	const { data: wallet } = useActiveWallet();
	const [isLoggingIn, setIsLoggingIn] = React.useState<boolean>(false);
	const { isConnected } = useAccount();

	const { data: profile } = useActiveProfile();

	if (wallet === null || wallet === undefined ) {
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
						className='bg-[#3d81ff] !rounded-3xl !p-5 !px-8 text-white hover:!text-white !text-[1rem] flex items-center'
						onClick={() => {
							setIsLoggingIn(true);
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
				<WalletModal
					modalOpen={walletModalOpen}
					setModalOpen={setWalletModalOpen}
					isLoggingIn={isLoggingIn}
					setIsLoggingIn={setIsLoggingIn}
				/>
			</>
		);
	}

	return (
		<div className='flex flex-row items-center gap-4'>
			<Button icon={<PiVideoCamera size={26} />} type='text' size='large' />
			<Notifications profileId={profile?.id!} />
			<UserDropdown profile={profile!}>
				<Button
					type='text'
					size='large'
					className='!p-7 flex items-center justify-center hover:!bg-transparent'
					icon={
						<div className='max-w-[46px] border-2 border-primary flex justify-center items-center rounded-full'>
							<ProfileAvatar
								picture={profile?.picture || null}
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
