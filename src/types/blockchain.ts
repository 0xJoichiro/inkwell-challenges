import { ApiPromise } from '@polkadot/api'
import { ContractPromise } from '@polkadot/api-contract'
import { InjectedAccountWithMeta, InjectedExtension } from '@polkadot/extension-inject/types'

export interface BlockchainState {
  api: ApiPromise | null
  accounts: InjectedAccountWithMeta[]
  selectedAccount: InjectedAccountWithMeta | null
  extension: InjectedExtension | null
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  contracts: Map<string, ContractPromise>
  currentContract: ContractPromise | null
}

export interface ContractMetadata {
  address?: string
  abi: any
  wasm?: Uint8Array
}

export interface ChallengeContract {
  id: string
  metadata: ContractMetadata
  instanceRequired: boolean
}

export interface TransactionResult {
  success: boolean
  txHash?: string
  blockHash?: string
  error?: string
  events?: any[]
}

export interface GasEstimate {
  gasConsumed: string
  gasRequired: string
  storageDeposit: string
}

export interface WindowBlockchain {
  contract?: ContractPromise
  player?: InjectedAccountWithMeta
  api?: ApiPromise
  getBalance?: () => Promise<any>
  help?: () => void
  deployContract?: (metadata: ContractMetadata, constructorArgs?: any[]) => Promise<ContractPromise>
  estimateGas?: (contract: ContractPromise, method: string, args?: any[]) => Promise<GasEstimate>
}

declare global {
  interface Window {
    contract?: ContractPromise
    player?: InjectedAccountWithMeta
    api?: ApiPromise
    getBalance?: () => Promise<any>
    help?: () => void
    deployContract?: (metadata: ContractMetadata, constructorArgs?: any[]) => Promise<ContractPromise>
    estimateGas?: (contract: ContractPromise, method: string, args?: any[]) => Promise<GasEstimate>
  }
}