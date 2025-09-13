import { ContractMetadata } from '@/types/blockchain'

export interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  icon: string
  completed: boolean
  estimatedTime: string
  participants: number
  points: number
}

// Sample contract ABIs (in a real implementation, these would be imported from actual contract builds)
const sampleABI = {
  "source": {
    "hash": "0x...",
    "language": "ink! 4.0.0",
    "compiler": "rustc 1.68.0"
  },
  "contract": {
    "name": "sample_contract",
    "version": "0.1.0",
    "authors": ["OvertheInk Team"]
  },
  "spec": {
    "constructors": [
      {
        "args": [],
        "docs": [],
        "label": "new",
        "payable": false,
        "returnType": {
          "displayName": ["ink_primitives", "ConstructorResult"],
          "type": 0
        },
        "selector": "0x9bae9d5e"
      }
    ],
    "docs": [],
    "events": [],
    "lang_error": {
      "displayName": ["ink", "LangError"],
      "type": 1
    },
    "messages": [
      {
        "args": [],
        "docs": [],
        "label": "get_value",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": ["Result"],
          "type": 2
        },
        "selector": "0x8b90919b"
      },
      {
        "args": [
          {
            "label": "value",
            "type": {
              "displayName": ["u32"],
              "type": 3
            }
          }
        ],
        "docs": [],
        "label": "set_value",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": ["Result"],
          "type": 4
        },
        "selector": "0x69c6c3b4"
      }
    ]
  },
  "types": []
}

export interface ChallengeWithContract extends Challenge {
  contractMetadata?: ContractMetadata
  instanceRequired?: boolean
  deploymentGas?: string
}

export const challenges: ChallengeWithContract[] = [
  {
    id: 'hello-ink',
    title: 'Hello Ink!',
    description: 'Learn the basics of Ink smart contracts by creating your first "Hello World" contract and understanding the fundamentals.',
    difficulty: 'Beginner',
    icon: '👋',
    completed: false,
    estimatedTime: '30min',
    participants: 1250,
    points: 100,
    contractMetadata: {
      address: '5GHvCVpNmJSp6qL4fEPnZgUj9D8rRoD4t9iQ3d8gQ4nGJ7x8', // Sample address for Rococo testnet
      abi: sampleABI
    },
    instanceRequired: true,
    deploymentGas: '100000000000'
  },
  {
    id: 'storage-basics',
    title: 'Storage Fundamentals',
    description: 'Master the storage patterns in Ink contracts, understand how to store and retrieve data efficiently.',
    difficulty: 'Beginner',
    icon: '📦',
    completed: false,
    estimatedTime: '45min',
    participants: 980,
    points: 150,
    contractMetadata: {
      address: '5FhPCVpNmJSp6qL4fEPnZgUj9D8rRoD4t9iQ3d8gQ4nGJ8x9',
      abi: sampleABI
    },
    instanceRequired: true,
    deploymentGas: '120000000000'
  },
  {
    id: 'token-creation',
    title: 'Token Factory',
    description: 'Build your own PSP-22 token contract with minting, burning, and transfer capabilities.',
    difficulty: 'Intermediate',
    icon: '🪙',
    completed: false,
    estimatedTime: '1.5h',
    participants: 750,
    points: 250
  },
  {
    id: 'access-control',
    title: 'Access Control',
    description: 'Implement proper access control mechanisms to secure your smart contracts against unauthorized access.',
    difficulty: 'Intermediate',
    icon: '🔐',
    completed: false,
    estimatedTime: '1h',
    participants: 650,
    points: 300
  },
  {
    id: 'reentrancy-guard',
    title: 'Reentrancy Protection',
    description: 'Learn to identify and prevent reentrancy attacks in your Ink smart contracts.',
    difficulty: 'Advanced',
    icon: '🛡️',
    completed: false,
    estimatedTime: '2h',
    participants: 420,
    points: 400
  },
  {
    id: 'overflow-protection',
    title: 'Integer Overflow Shield',
    description: 'Understand and implement protection against integer overflow and underflow vulnerabilities.',
    difficulty: 'Advanced',
    icon: '⚡',
    completed: false,
    estimatedTime: '1.5h',
    participants: 380,
    points: 350
  },
  {
    id: 'multi-sig-wallet',
    title: 'Multi-Signature Wallet',
    description: 'Create a sophisticated multi-signature wallet with customizable threshold requirements.',
    difficulty: 'Expert',
    icon: '🏦',
    completed: false,
    estimatedTime: '3h',
    participants: 180,
    points: 600
  },
  {
    id: 'proxy-patterns',
    title: 'Upgradeable Contracts',
    description: 'Master proxy patterns and create upgradeable smart contracts while maintaining security.',
    difficulty: 'Expert',
    icon: '🔄',
    completed: false,
    estimatedTime: '2.5h',
    participants: 120,
    points: 550
  },
  {
    id: 'cross-contract',
    title: 'Cross-Contract Calls',
    description: 'Learn advanced patterns for secure cross-contract communication and composability.',
    difficulty: 'Advanced',
    icon: '🔗',
    completed: false,
    estimatedTime: '2h',
    participants: 290,
    points: 450
  },
  {
    id: 'governance-dao',
    title: 'DAO Governance',
    description: 'Build a complete decentralized governance system with voting mechanisms and proposal execution.',
    difficulty: 'Expert',
    icon: '🏛️',
    completed: false,
    estimatedTime: '4h',
    participants: 95,
    points: 750
  },
  {
    id: 'nft-marketplace',
    title: 'NFT Marketplace',
    description: 'Construct a full-featured NFT marketplace with auctions, royalties, and advanced trading features.',
    difficulty: 'Expert',
    icon: '🎨',
    completed: false,
    estimatedTime: '3.5h',
    participants: 140,
    points: 700
  },
  {
    id: 'defi-lending',
    title: 'DeFi Lending Protocol',
    description: 'Create a sophisticated lending protocol with interest rates, collateralization, and liquidation mechanisms.',
    difficulty: 'Expert',
    icon: '💰',
    completed: false,
    estimatedTime: '4.5h',
    participants: 75,
    points: 800
  }
]
