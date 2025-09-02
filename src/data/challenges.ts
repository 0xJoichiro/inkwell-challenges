import { Challenge } from '@/components/ChallengeCard'

export const challenges: Challenge[] = [
  {
    id: 'hello-ink',
    title: 'Hello Ink!',
    description: 'Learn the basics of Ink smart contracts by creating your first "Hello World" contract and understanding the fundamentals.',
    difficulty: 'Beginner',
    icon: '👋',
    completed: false,
    estimatedTime: '30min',
    participants: 1250,
    points: 100
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
    points: 150
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