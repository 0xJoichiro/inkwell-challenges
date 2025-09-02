import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Users, Star, Shield, CheckCircle, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { challenges } from '@/data/challenges'

const difficultyColors = {
  Beginner: 'bg-success text-success-foreground',
  Intermediate: 'bg-warning text-warning-foreground',
  Advanced: 'bg-primary text-primary-foreground',
  Expert: 'bg-destructive text-destructive-foreground'
}

export function ChallengePage() {
  const { id } = useParams<{ id: string }>()
  const challenge = challenges.find(c => c.id === id)

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
            
            <div className="lg:text-right">
              <Button 
                size="lg" 
                className={`${
                  challenge.completed 
                    ? 'bg-success hover:bg-success/90' 
                    : 'bg-primary hover:bg-hover shadow-glow'
                } transition-all duration-300`}
              >
                {challenge.completed ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Review Solution
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    Start Challenge
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Challenge Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  This challenge will test your understanding of {challenge.title.toLowerCase()} in Ink smart contracts.
                  You'll need to identify vulnerabilities, implement fixes, and demonstrate your knowledge of secure coding practices.
                </p>
                
                <Separator />
                
                <div className="space-y-3">
                  <h4 className="font-semibold">What you'll learn:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Core concepts and security patterns in Ink development</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Common vulnerabilities and how to prevent them</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Best practices for smart contract security</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Testing and verification techniques</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Prerequisites</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Before starting this challenge, make sure you have:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Basic understanding of Rust programming</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Familiarity with blockchain concepts</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Ink! development environment set up</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Challenge Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completion Rate</span>
                  <span className="font-semibold">
                    {Math.round((challenge.participants * 0.3))}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Time</span>
                  <span className="font-semibold">{challenge.estimatedTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Points Reward</span>
                  <span className="font-semibold">{challenge.points}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Difficulty</span>
                  <Badge className={difficultyColors[challenge.difficulty]}>
                    {challenge.difficulty}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tools & Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  📚 Ink! Documentation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🔧 Cargo Contract
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🧪 Test Environment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  💬 Community Discord
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}