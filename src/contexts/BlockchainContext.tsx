import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { ContractPromise } from '@polkadot/api-contract'
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp'
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { BlockchainState, ContractMetadata, TransactionResult, GasEstimate } from '@/types/blockchain'
import { useToast } from '@/hooks/use-toast'

interface BlockchainContextType extends BlockchainState {
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  selectAccount: (account: InjectedAccountWithMeta) => void
  deployContract: (metadata: ContractMetadata, constructorArgs?: any[]) => Promise<ContractPromise | null>
  setCurrentContract: (contract: ContractPromise) => void
  executeTransaction: (contract: ContractPromise, method: string, args?: any[], gasLimit?: string) => Promise<TransactionResult>
  queryContract: (contract: ContractPromise, method: string, args?: any[]) => Promise<any>
  estimateGas: (contract: ContractPromise, method: string, args?: any[]) => Promise<GasEstimate | null>
  getBalance: () => Promise<any>
}

const initialState: BlockchainState = {
  api: null,
  accounts: [],
  selectedAccount: null,
  extension: null,
  isConnected: false,
  isConnecting: false,
  error: null,
  contracts: new Map(),
  currentContract: null,
}

const BlockchainContext = createContext<BlockchainContextType | null>(null)

const NETWORK_ENDPOINTS = {
  'Polkadot': 'wss://rpc.polkadot.io',
  'Kusama': 'wss://kusama-rpc.polkadot.io',
  'Rococo': 'wss://rococo-rpc.polkadot.io',
  'Westend': 'wss://westend-rpc.polkadot.io',
}

export function BlockchainProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BlockchainState>(initialState)
  const [selectedNetwork, setSelectedNetwork] = useState<keyof typeof NETWORK_ENDPOINTS>('Rococo')
  const { toast } = useToast()

  // Initialize API connection
  useEffect(() => {
    const initApi = async () => {
      try {
        setState(prev => ({ ...prev, isConnecting: true, error: null }))
        
        const provider = new WsProvider(NETWORK_ENDPOINTS[selectedNetwork])
        const api = await ApiPromise.create({ provider })
        
        setState(prev => ({ 
          ...prev, 
          api, 
          isConnecting: false,
          error: null
        }))

        console.log(`✅ Connected to ${selectedNetwork} network`)
      } catch (error) {
        console.error('Failed to connect to network:', error)
        setState(prev => ({ 
          ...prev, 
          isConnecting: false, 
          error: `Failed to connect to ${selectedNetwork}` 
        }))
        toast({
          title: "Network Connection Failed",
          description: `Could not connect to ${selectedNetwork}. Please try again.`,
          variant: "destructive"
        })
      }
    }

    initApi()
  }, [selectedNetwork, toast])

  // Setup global window objects
  useEffect(() => {
    if (state.api && state.selectedAccount && state.currentContract) {
      // Expose global objects to console
      window.api = state.api
      window.player = state.selectedAccount
      window.contract = state.currentContract
      
      window.getBalance = async () => {
        if (!state.api || !state.selectedAccount) return null
        const account = await state.api.query.system.account(state.selectedAccount.address)
        return account.toHuman()
      }

      window.help = () => {
        console.log(`
🚀 OvertheInk Console Helper
============================

Available globals:
• api      - Polkadot API instance
• player   - Your connected account
• contract - Current challenge contract

Functions:
• getBalance()     - Get your account balance
• help()          - Show this help message

Example Usage:
• await contract.query.getValue(player.address, { gasLimit: -1 }, ...args)
• await contract.tx.setValue({ gasLimit: gasEstimate }, ...args).signAndSend(player.address, callback)
• await getBalance()

Happy hacking! 🎯
        `)
      }

      window.deployContract = async (metadata: ContractMetadata, constructorArgs: any[] = []) => {
        return await deployContract(metadata, constructorArgs)
      }

      window.estimateGas = async (contract: ContractPromise, method: string, args: any[] = []) => {
        return await estimateGas(contract, method, args)
      }

      console.log('🎯 Blockchain globals are ready! Type help() for more info.')
    }

    return () => {
      // Cleanup global objects
      delete window.api
      delete window.player
      delete window.contract
      delete window.getBalance
      delete window.help
      delete window.deployContract
      delete window.estimateGas
    }
  }, [state.api, state.selectedAccount, state.currentContract])

  const connectWallet = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isConnecting: true, error: null }))

      const extensions = await web3Enable('OvertheInk')
      if (extensions.length === 0) {
        throw new Error('No Polkadot.js extension found. Please install it first.')
      }

      const accounts = await web3Accounts()
      if (accounts.length === 0) {
        throw new Error('No accounts found. Please create an account in your Polkadot.js extension.')
      }

      setState(prev => ({
        ...prev,
        accounts,
        selectedAccount: accounts[0],
        extension: extensions[0],
        isConnected: true,
        isConnecting: false,
        error: null
      }))

      toast({
        title: "Wallet Connected",
        description: `Connected with ${accounts.length} account(s)`,
      })

    } catch (error) {
      console.error('Wallet connection failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setState(prev => ({ 
        ...prev, 
        isConnecting: false, 
        error: errorMessage 
      }))
      toast({
        title: "Connection Failed",
        description: errorMessage,
        variant: "destructive"
      })
    }
  }, [toast])

  const disconnectWallet = useCallback(() => {
    setState(prev => ({
      ...prev,
      accounts: [],
      selectedAccount: null,
      extension: null,
      isConnected: false,
      error: null,
      contracts: new Map(),
      currentContract: null
    }))
    
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected from wallet",
    })
  }, [toast])

  const selectAccount = useCallback((account: InjectedAccountWithMeta) => {
    setState(prev => ({ ...prev, selectedAccount: account }))
  }, [])

  const deployContract = useCallback(async (
    metadata: ContractMetadata, 
    constructorArgs: any[] = []
  ): Promise<ContractPromise | null> => {
    if (!state.api || !state.selectedAccount) {
      toast({
        title: "Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive"
      })
      return null
    }

    try {
      // This is a simplified version - in reality you'd need the contract's WASM code
      // For now, we'll assume contracts are pre-deployed and we're just connecting to them
      if (metadata.address) {
        const contract = new ContractPromise(state.api, metadata.abi, metadata.address)
        setState(prev => ({
          ...prev,
          contracts: prev.contracts.set(metadata.address!, contract),
          currentContract: contract
        }))
        return contract
      }
      
      throw new Error('Contract deployment not implemented - using pre-deployed contracts for challenges')
    } catch (error) {
      console.error('Contract deployment failed:', error)
      toast({
        title: "Deployment Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      })
      return null
    }
  }, [state.api, state.selectedAccount, toast])

  const setCurrentContract = useCallback((contract: ContractPromise) => {
    setState(prev => ({ ...prev, currentContract: contract }))
  }, [])

  const executeTransaction = useCallback(async (
    contract: ContractPromise,
    method: string,
    args: any[] = [],
    gasLimit: string = '100000000000'
  ): Promise<TransactionResult> => {
    if (!state.selectedAccount || !state.extension) {
      throw new Error('No account selected')
    }

    try {
      const injector = await web3FromAddress(state.selectedAccount.address)
      
        return new Promise((resolve, reject) => {
        contract.tx[method]({ gasLimit }, ...args)
          .signAndSend(state.selectedAccount!.address, { signer: injector.signer }, (result) => {
            if (result.status.isInBlock) {
              resolve({
                success: true,
                txHash: result.txHash.toString(),
                blockHash: result.status.asInBlock.toString(),
                events: result.events.map(event => event.toHuman())
              })
            } else if (result.status.isFinalized) {
              resolve({
                success: true,
                txHash: result.txHash.toString(),
                blockHash: result.status.asFinalized.toString(),
                events: result.events.map(event => event.toHuman())
              })
            } else if (result.isError) {
              reject(new Error('Transaction failed'))
            }
          })
          .catch(reject)
      })
    } catch (error) {
      console.error('Transaction failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }, [state.selectedAccount, state.extension])

  const queryContract = useCallback(async (
    contract: ContractPromise,
    method: string,
    args: any[] = []
  ): Promise<any> => {
    if (!state.selectedAccount) {
      throw new Error('No account selected')
    }

    try {
      const { result, output } = await contract.query[method](
        state.selectedAccount.address,
        { gasLimit: -1 },
        ...args
      )

      if (result.isOk) {
        return output?.toHuman()
      } else {
        throw new Error('Query failed')
      }
    } catch (error) {
      console.error('Query failed:', error)
      throw error
    }
  }, [state.selectedAccount])

  const estimateGas = useCallback(async (
    contract: ContractPromise,
    method: string,
    args: any[] = []
  ): Promise<GasEstimate | null> => {
    if (!state.selectedAccount) return null

    try {
      const { gasConsumed, gasRequired, storageDeposit } = await contract.query[method](
        state.selectedAccount.address,
        { gasLimit: -1 },
        ...args
      )

      return {
        gasConsumed: gasConsumed.toString(),
        gasRequired: gasRequired.toString(),
        storageDeposit: storageDeposit.toString()
      }
    } catch (error) {
      console.error('Gas estimation failed:', error)
      return null
    }
  }, [state.selectedAccount])

  const getBalance = useCallback(async () => {
    if (!state.api || !state.selectedAccount) return null
    const account = await state.api.query.system.account(state.selectedAccount.address)
    return account.toHuman()
  }, [state.api, state.selectedAccount])

  const contextValue: BlockchainContextType = {
    ...state,
    connectWallet,
    disconnectWallet,
    selectAccount,
    deployContract,
    setCurrentContract,
    executeTransaction,
    queryContract,
    estimateGas,
    getBalance
  }

  return (
    <BlockchainContext.Provider value={contextValue}>
      {children}
    </BlockchainContext.Provider>
  )
}

export const useBlockchain = () => {
  const context = useContext(BlockchainContext)
  if (!context) {
    throw new Error('useBlockchain must be used within a BlockchainProvider')
  }
  return context
}