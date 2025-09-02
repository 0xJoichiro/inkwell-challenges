import { useState } from 'react'
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { useWallet } from '@/hooks/useWallet'
import { useToast } from '@/hooks/use-toast'

export function WalletButton() {
  const { 
    isConnected, 
    isConnecting, 
    selectedAccount, 
    accounts, 
    connectWallet, 
    disconnectWallet,
    selectAccount
  } = useWallet()
  const { toast } = useToast()

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    } catch (error) {
      console.error('Failed to copy address:', error)
    }
  }

  if (!isConnected) {
    return (
      <Button 
        onClick={connectWallet}
        disabled={isConnecting}
        className="bg-primary hover:bg-hover shadow-glow transition-all duration-300"
      >
        <Wallet className="h-4 w-4 mr-2" />
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-[140px]">
          <Wallet className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">
            {selectedAccount?.meta.name || formatAddress(selectedAccount?.address || '')}
          </span>
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="flex items-center justify-between">
            <span>Connected Wallet</span>
            <Badge variant="secondary" className="text-xs">
              {accounts.length} account{accounts.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {accounts.map((account) => (
          <DropdownMenuItem
            key={account.address}
            onClick={() => selectAccount(account)}
            className={`flex flex-col items-start space-y-1 p-3 ${
              selectedAccount?.address === account.address ? 'bg-muted' : ''
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">{account.meta.name}</span>
              {selectedAccount?.address === account.address && (
                <Badge variant="default" className="text-xs">Active</Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>{formatAddress(account.address)}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={(e) => {
                  e.stopPropagation()
                  copyAddress(account.address)
                }}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          onClick={() => {
            if (selectedAccount) {
              window.open(`https://polkadot.js.org/apps/#/accounts/${selectedAccount.address}`, '_blank')
            }
          }}
          className="flex items-center"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View in Explorer
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={disconnectWallet}
          className="flex items-center text-destructive focus:text-destructive"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}