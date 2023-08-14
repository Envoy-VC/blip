import React from 'react';
import { Button, Avatar, Badge, Spin, ConfigProvider } from 'antd';

import { useWalletLogin } from '@lens-protocol/react-web';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { useActiveWallet } from '@lens-protocol/react-web';

import UserDropdown from './user-dropdown';

import { PiBell, PiVideoCamera } from 'react-icons/pi';
import { LoadingOutlined } from '@ant-design/icons';
import { LensLogo } from '@/components/icons';

const ConnectButton = () => {
	const {
		execute: login,
		error: loginError,
		isPending: isLoginPending,
	} = useWalletLogin();

	const { data: wallet, loading } = useActiveWallet();
	const [isLoggingIn, setIsLoggingIn] = React.useState<boolean>(false);
	const { isConnected } = useAccount();
	const { disconnectAsync } = useDisconnect();

	const { connectAsync } = useConnect({
		connector: new InjectedConnector(),
	});

	const loginWithLens = async () => {
		try {
			setIsLoggingIn(true);
			if (isConnected) {
				await disconnectAsync();
			}

			const { connector } = await connectAsync();

			if (connector instanceof InjectedConnector) {
				const walletClient = await connector.getWalletClient();
				await login({
					address: walletClient.account.address,
				}).then((res) => setIsLoggingIn(false));
			}
			setIsLoggingIn(false);
		} catch (error) {
			setIsLoggingIn(false);
			throw new Error('Error logging in with Lens');
		}
	};

	if (wallet === null || wallet === undefined || !isConnected) {
		return (
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
					onClick={loginWithLens}
					disabled={isLoggingIn}
					size='large'
				>
					<div className='flex flex-row items-center justify-center gap-2'>
						{isLoggingIn || isLoginPending ? (
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
						Login with Lens
					</div>
				</Button>
			</ConfigProvider>
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
