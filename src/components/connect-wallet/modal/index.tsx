/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { ConfigProvider, Modal, Image, Button, Spin } from 'antd';
import toast from 'react-hot-toast';
import { useTheme } from 'next-themes';
import { useWalletLogin } from '@lens-protocol/react-web';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

// Store
import { useWalletConnectionStore } from '~/stores';

// Icons
import MetamaskLogo from '../../../../public/metamask.png';
import WalletConnectLogo from '../../../../public/walletConnect.png';
import { LoadingOutlined } from '@ant-design/icons';
import { LensLogo } from '~/components/icons';

// Config
import { env } from '~/env.mjs';
const { NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID } = env;

// Types
import type { StaticImageData } from 'next/image';

interface IWallet {
	name: string;
	label: React.ReactNode;
	icon: StaticImageData;
}

const wallets: IWallet[] = [
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

const WalletModal = () => {
	const { theme } = useTheme();
	const {
		walletModalOpen,
		isLoggingIn,
		walletType,
		isLensLoggingIn,
		setWalletModalOpen,
		setIsLoggingIn,
		setWalletType,
		setIsLensLoggingIn,
	} = useWalletConnectionStore();

	const { connectAsync } = useConnect();
	const { disconnectAsync } = useDisconnect();
	const { isConnected, connector: activeConnector } = useAccount();

	const { execute: login } = useWalletLogin();

	const connectWallet = async (type: string) => {
		if (isConnected) {
			await disconnectAsync();
		}
		switch (type) {
			case 'metamask':
				setWalletType('metamask');
				await connectAsync({
					// @ts-ignore
					connector: new InjectedConnector(),
				});
				break;
			case 'walletconnect':
				setWalletType('walletconnect');
				await connectAsync({
					connector: new WalletConnectConnector({
						options: {
							projectId: NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,

							qrModalOptions: {
								themeMode: theme === 'dark' ? 'dark' : 'light',
								themeVariables: {
									'--wcm-z-index': '10000',
								},
							},
						},
					}),
				});
				break;
		}
	};

	const onClickConnect = (type: string) => {
		setIsLoggingIn(true);
		connectWallet(type)
			.catch(() => {
				toast.error('Something went wrong. Please try again.');
			})
			.finally(() => {
				setIsLoggingIn(false);
			});
	};

	const loginWithLens = async () => {
		try {
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

	const onLensLoginClick = () => {
		setIsLensLoggingIn(true);
		loginWithLens()
			.catch(() => {
				toast.error('Something went wrong');
			})
			.finally(() => {
				setIsLensLoggingIn(false);
			});
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
				open={walletModalOpen}
				footer={null}
				onCancel={() => {
					setIsLoggingIn(false);
					setWalletModalOpen(false);
				}}
				width={400}
				zIndex={1000}
			>
				{!isConnected && (
					<div className='my-8 flex flex-col gap-2'>
						{wallets.map((wallet, index) => (
							<Button
								key={index}
								className='flex cursor-pointer flex-row items-center justify-between gap-6 !rounded-lg !border-[1px] !border-slate-200 p-3 !py-6'
								size='large'
								shape='default'
								type='text'
								onClick={() => onClickConnect(wallet.name)}
								disabled={isLoggingIn}
							>
								<div className='flex flex-row items-center gap-6'>
									<Image
										src={wallet.icon.src}
										alt='MetaMask Icon'
										preview={false}
										width={30}
									/>
									<span className='font-sans text-[1rem] font-medium'>
										{wallet.label}
									</span>
								</div>
								{isLoggingIn && walletType === wallet.name && (
									<Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
								)}
							</Button>
						))}
					</div>
				)}
				{isConnected && (
					<div className='my-4 flex w-fit flex-col gap-2'>
						<div className='my-4 font-sans text-sm font-medium'>
							Authenticate your Lens profile to interact within the app.
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
								className='flex w-fit items-center justify-center !rounded-3xl bg-[#3d81ff] !p-5 !px-8 !text-[1rem] text-white  hover:!text-white'
								size='large'
								onClick={onLensLoginClick}
								disabled={isLensLoggingIn}
							>
								<div className='flex flex-row items-center justify-start gap-2'>
									{isLensLoggingIn ? (
										<Spin
											indicator={
												<LoadingOutlined style={{ fontSize: 20, color: '#fff' }} spin />
											}
										/>
									) : (
										<LensLogo size='46' />
									)}
									<span>Sign-in</span>
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
