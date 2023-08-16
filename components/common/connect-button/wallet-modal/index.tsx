import React from 'react';
import { ConfigProvider, Modal, Image, Button, Spin } from 'antd';

import { useWalletLogin } from '@lens-protocol/react-web';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import MetamaskLogo from '@/public/metamask.png';
import WalletConnectLogo from '@/public/walletConnect.png';
import { LoadingOutlined } from '@ant-design/icons';
import { LensLogo } from '@/components/icons';

import { WALLET_CONNECT_PROJECT_ID } from '@/config';

interface Props {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isLoggingIn: boolean;
	setIsLoggingIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const wallets = [
	{
		name: 'metamask',
		label: 'MetaMask',
		icon: MetamaskLogo,
	},
	{
		name: 'walletconnect',
		label: 'WalletConnect',
		icon: WalletConnectLogo,
	},
];

const WalletModal = ({
	modalOpen,
	setModalOpen,
	isLoggingIn,
	setIsLoggingIn,
}: Props) => {
	const handleModalState = (state: boolean) => setModalOpen(state);
	const [isLensLoggingIn, setIsLensLoggingIn] = React.useState(false);

	const { connectAsync, connectors } = useConnect();
	const { disconnectAsync } = useDisconnect();
	const { isConnected, connector: activeConnector } = useAccount();

	const { execute: login } = useWalletLogin();

	const connectWallet = async (type: 'metamask' | 'walletconnect') => {
		if (isConnected) {
			await disconnectAsync();
		}
		if (type === 'metamask') {
			const { connector } = await connectAsync({
				// @ts-ignore
				connector: new InjectedConnector(),
			});
		} else if (type === 'walletconnect') {
			const { connector } = await connectAsync({
				// @ts-ignore
				connector: new WalletConnectConnector({
					options: {
						projectId: WALLET_CONNECT_PROJECT_ID,
					},
				}),
			});
		}
	};

	const loginWithLens = async () => {
		try {
			setIsLensLoggingIn(true);
			if (activeConnector instanceof InjectedConnector) {
				const walletClient = await activeConnector.getWalletClient();
				await login({
					address: walletClient.account.address,
				});
			}
			if (activeConnector instanceof WalletConnectConnector) {
				const walletClient = await activeConnector.getWalletClient();
				await login({
					address: walletClient.account.address,
				});
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLensLoggingIn(false);
		}
	};

	return (
		<ConfigProvider
			theme={{
				token: { borderRadiusLG: 24 },
				components: {
					Modal: {
						titleFontSize: 18,
					},
				},
			}}
		>
			<Modal
				title='Sign in with Lens'
				open={modalOpen}
				footer={null}
				onCancel={() => {
					setIsLoggingIn(false);
					handleModalState(false);
				}}
				width={400}
				zIndex={10}
			>
				{!isConnected && (
					<div className='flex flex-col gap-2 my-8'>
						{wallets.map((wallet, index) => (
							<Button
								key={index}
								className='p-3 flex flex-row gap-6 items-center justify-start cursor-pointer !rounded-lg border-none !py-6'
								size='large'
								shape='default'
								type='text'
								onClick={() =>
									connectWallet(wallet.name as 'metamask' | 'walletconnect')
								}
							>
								<Image
									src={wallet.icon.src}
									alt='MetaMask Icon'
									preview={false}
									width={30}
								/>
								<span className='text-[1rem] font-medium font-sans'>
									{wallet.label}
								</span>
							</Button>
						))}
					</div>
				)}
				{isConnected && (
					<div className='flex flex-col gap-2 my-4 w-fit'>
						<div className='my-4 font-sans text-sm font-medium'>
							Authenticate with Lens to access features like Uploading videos,
							Interacting with videos, etc.
						</div>
						<ConfigProvider
							theme={{
								token: {
									colorTextDisabled: '#fff',
									colorBgContainerDisabled: '#3d81ffcc',
								},
							}}
						>
							<Button
								className='bg-[#3d81ff] !rounded-3xl !p-5 !px-8 text-white hover:!text-white !text-[1rem] flex items-center justify-start  w-fit'
								size='large'
								onClick={loginWithLens}
								disabled={isLensLoggingIn}
							>
								<div className='flex flex-row items-center justify-start gap-2'>
									{isLensLoggingIn ? (
										<Spin
											indicator={
												<LoadingOutlined
													style={{ fontSize: 20, color: '#fff' }}
													spin
												/>
											}
										/>
									) : (
										<LensLogo size='46' />
									)}
									<span>Sign-In</span>
								</div>
							</Button>
						</ConfigProvider>
					</div>
				)}
			</Modal>
		</ConfigProvider>
	);
};

export default WalletModal;
