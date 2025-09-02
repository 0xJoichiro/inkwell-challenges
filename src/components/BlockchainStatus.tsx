import { Terminal, Wifi, WifiOff, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { useBlockchain } from '@/contexts/BlockchainContext'
import { useWallet } from '@/hooks/useWallet'

export function BlockchainStatus() {
  const { api, currentContract } = useBlockchain()
  const { isConnected, selectedAccount } = useWallet()

  if (!isConnected) {
    return (
      <Alert className="mb-6">
        <WifiOff className="h-4 w-4" />
        <AlertTitle>Wallet Not Connected</AlertTitle>
        <AlertDescription>
          Connect your Polkadot.js wallet to interact with blockchain challenges and access the developer console.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {api ? <Wifi className="h-4 w-4 text-success" /> : <WifiOff className="h-4 w-4 text-destructive" />}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-2">
            <AlertTitle className="mb-0">Blockchain Status</AlertTitle>
            <Badge variant={api ? "default" : "destructive"} className="text-xs">
              {api ? "Connected" : "Disconnected"}
            </Badge>
          </div>
          <AlertDescription className="space-y-1">
            <div className="flex items-center space-x-2 text-sm">
              <span>Account:</span>
              <code className="px-2 py-1 bg-muted rounded text-xs">
                {selectedAccount?.meta.name || 'None'}
              </code>
            </div>
            {currentContract && (
              <div className="flex items-center space-x-2 text-sm">
                <Terminal className="h-3 w-3" />
                <span>Contract ready in console:</span>
                <code className="px-2 py-1 bg-muted rounded text-xs">
                  window.contract
                </code>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              💡 Type <code>help()</code> in the browser console for blockchain interaction commands
            </p>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  )
}