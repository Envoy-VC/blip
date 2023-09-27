import { create } from 'zustand';

interface WalletConnectionState {
	walletModalOpen: boolean;
	isLoggingIn: boolean;
	walletType: string;
	isLensLoggingIn: boolean;
	setWalletModalOpen: (walletModalOpen: boolean) => void;
	setIsLoggingIn: (isLoggingIn: boolean) => void;
	setWalletType: (walletType: string) => void;
	setIsLensLoggingIn: (isLensLoggingIn: boolean) => void;
}

export const useWalletConnectionStore = create<WalletConnectionState>(
	(set) => ({
		walletModalOpen: false,
		isLoggingIn: false,
		walletType: 'metamask',
		isLensLoggingIn: false,
		setWalletModalOpen: (walletModalOpen) => set({ walletModalOpen }),
		setIsLoggingIn: (isLoggingIn) => set({ isLoggingIn }),
		setWalletType: (walletType) => set({ walletType }),
		setIsLensLoggingIn: (isLensLoggingIn) => set({ isLensLoggingIn }),
	})
);
