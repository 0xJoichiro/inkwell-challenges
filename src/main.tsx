import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);

// Global console helpers for development
declare global {
  var help: () => void;
  var player: string;
  var overtheink: string;
  var version: string;
  var getBlockNumber: () => string;
  var getBalance: (address?: string) => string;
  var getNetworkId: () => string;
}

globalThis.help = function() {
  console.log(`
Available Console Commands:
player                        - current player address
overtheink                    - main game contract
getBlockNumber()             - gets current network block number
version                       - current game version
getBalance(address)          - gets balance of address in ether
getNetworkId()               - get ethereum network id
help()                        - show this help menu
  `);
};

// Blockchain/Game helpers with dummy data
globalThis.player = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e0";
globalThis.overtheink = "0x8f6e2F4E23C3A8B1D9c2E7f4A2b8c7e9f3A4c6e8b";
globalThis.getBlockNumber = function() { return "Block: 18456789"; };
globalThis.version = "v1.0.0-alpha";
globalThis.getBalance = function(address) { return address ? `Balance: 1.234 ETH (${address})` : "Balance: 1.234 ETH"; };
globalThis.getNetworkId = function() { return "Network: 1 (Ethereum Mainnet)"; };
