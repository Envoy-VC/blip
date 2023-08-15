import React from 'react';
import { Button, Avatar, Badge, ConfigProvider } from 'antd';

import { useAccount } from 'wagmi';

import { useActiveWallet } from '@lens-protocol/react-web';

import UserDropdown from './user-dropdown';
import WalletModal from './wallet-modal';

import { PiBell, PiVideoCamera } from 'react-icons/pi';

const ConnectButton = () => {
	const [walletModalOpen, setWalletModalOpen] = React.useState<boolean>(false);

	const { data: wallet } = useActiveWallet();
	const [isLoggingIn, setIsLoggingIn] = React.useState<boolean>(false);
	const { isConnected } = useAccount();

	if (wallet === null || wallet === undefined || !isConnected) {
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
			<Button
				icon={<PiVideoCamera size={26} color='#000' />}
				type='text'
				size='large'
			/>
			<Badge count={24} color='geekblue' offset={[-6, 6]}>
				<Button icon={<PiBell size={26} />} type='text' size='large' />
			</Badge>
			<UserDropdown>
				<Button
					type='text'
					size='large'
					className='!p-7 flex items-center justify-center hover:!bg-transparent'
					icon={
						<div className='max-w-[46px] border-2 border-primary flex justify-center items-center rounded-full'>
							<Avatar
								src='https://ik.imagekit.io/lens/media-snapshot/tr:w-60,h-60/76b1f278593adccb1eccdf3d3bce16fd20082a880ba61f73e3f77978e674be60.png'
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
