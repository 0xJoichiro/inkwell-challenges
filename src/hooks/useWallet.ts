import { useBlockchain } from '@/contexts/BlockchainContext'

export function useWallet() {
  const {
    accounts,
    selectedAccount,
    isConnected,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    selectAccount,
    getBalance
  } = useBlockchain()

  return {
    accounts,
    selectedAccount,
    isConnected,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    selectAccount,
    getBalance,
    address: selectedAccount?.address,
    name: selectedAccount?.meta.name
  }
}