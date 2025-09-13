import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Users, Star, Shield, CheckCircle, AlertTriangle, Wallet, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { challenges } from '@/data/challenges'
import { useBlockchain } from '@/contexts/BlockchainContext'
import { useWallet } from '@/hooks/useWallet'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'

const difficultyColors = {
  Beginner: 'bg-success text-success-foreground',
  Intermediate: 'bg-warning text-warning-foreground',
  Advanced: 'bg-primary text-primary-foreground',
  Expert: 'bg-destructive text-destructive-foreground'
}

export function ChallengePage() {
  const { id } = useParams<{ id: string }>()
  const challenge = challenges.find(c => c.id === id)
  const { deployContract, currentContract, api } = useBlockchain()
  const { isConnected, connectWallet } = useWallet()
  const { toast } = useToast()
  const [isDeploying, setIsDeploying] = useState(false)
  const [hasInstance, setHasInstance] = useState(false)

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">❓</div>
          <h1 className="text-2xl font-bold">Challenge Not Found</h1>
          <p className="text-muted-foreground">The challenge you're looking for doesn't exist.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Challenges
            </Button>
          </Link>
          </div>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-card">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-4xl">
                  {challenge.icon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{challenge.title}</h1>
                  <Badge className={`${difficultyColors[challenge.difficulty]} mt-2`}>
                    {challenge.difficulty}
                  </Badge>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground max-w-2xl">
                {challenge.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{challenge.estimatedTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{challenge.participants} participants</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span>{challenge.points} points</span>
                </div>
              </div>
            </div>
            
            <div className="lg:text-right space-y-3">
              {!isConnected ? (
                <Button
                  size="lg"
                  onClick={connectWallet}
                  className="bg-warning hover:bg-warning/90 text-warning-foreground"
                >
                  <Wallet className="h-5 w-5 mr-2" />
                  Connect Wallet First
                </Button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <div className="flex space-x-2">
                    <Button
                      size="lg"
                      onClick={async () => {
                        if (!challenge.contractMetadata) return
                        setIsDeploying(true)
                        try {
                          const contract = await deployContract(challenge.contractMetadata)
                          if (contract) {
                            setHasInstance(true)
                            toast({
                              title: "Contract Instance Ready",
                              description: "Your personal contract instance has been deployed. Check the console!",
                            })
                          }
                        } catch (error) {
                          toast({
                            title: "Deployment Failed",
                            description: "Failed to get contract instance. Please try again.",
                            variant: "destructive"
                          })
                          console.error('Contract deployment error:', error)
                        } finally {
                          setIsDeploying(false)
                        }
                      }}
                      disabled={isDeploying || hasInstance}
                      className="bg-primary hover:bg-hover shadow-glow transition-all duration-300"
                    >
                      <Shield className="h-5 w-5 mr-2" />
                      {isDeploying ? 'Getting Instance...' : 'Add Instance'}
                    </Button>
                    <Button
                      size="lg"
                      className={`${
                        challenge.completed
                          ? 'bg-success hover:bg-success/90'
                          : 'bg-primary hover:bg-hover shadow-glow'
                      } transition-all duration-300`}
                      disabled={!hasInstance}
                    >
                      {challenge.completed ? (
                        <>
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Review Solution
                        </>
                      ) : (
                        <>
                          <Terminal className="h-5 w-5 mr-2" />
                          Submit Instance
                        </>
                      )}
                    </Button>
                  </div>
                  {hasInstance && (
                    <p className="text-sm text-muted-foreground text-right">
                      💡 Open browser console to interact with your contract
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}
