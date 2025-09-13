import { useState } from 'react'
import { Trophy, Medal, Award, Users, TrendingUp, Calendar, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface LeaderboardEntry {
  id: string
  username: string
  avatar: string
  points: number
  challengesCompleted: number
  streak: number
  rank: number
  rankChange: number
  lastActive: string
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    username: 'InkMaster',
    avatar: '🥇',
    points: 3750,
    challengesCompleted: 12,
    streak: 15,
    rank: 1,
    rankChange: 0,
    lastActive: '2 hours ago'
  },
  {
    id: '2',
    username: 'SecureCode',
    avatar: '🥈',
    points: 3420,
    challengesCompleted: 11,
    streak: 8,
    rank: 2,
    rankChange: 1,
    lastActive: '5 hours ago'
  },
  {
    id: '3',
    username: 'BlockchainNinja',
    avatar: '🥉',
    points: 3180,
    challengesCompleted: 10,
    streak: 12,
    rank: 3,
    rankChange: -1,
    lastActive: '1 day ago'
  },
  {
    id: '4',
    username: 'RustGuru',
    avatar: '🦀',
    points: 2940,
    challengesCompleted: 9,
    streak: 6,
    rank: 4,
    rankChange: 2,
    lastActive: '3 hours ago'
  },
  {
    id: '5',
    username: 'CryptoHacker',
    avatar: '💻',
    points: 2750,
    challengesCompleted: 8,
    streak: 4,
    rank: 5,
    rankChange: -1,
    lastActive: '12 hours ago'
  },
  {
    id: '6',
    username: 'SmartContractPro',
    avatar: '⚡',
    points: 2580,
    challengesCompleted: 8,
    streak: 10,
    rank: 6,
    rankChange: 0,
    lastActive: '6 hours ago'
  },
  {
    id: '7',
    username: 'Web3Explorer',
    avatar: '🚀',
    points: 2340,
    challengesCompleted: 7,
    streak: 3,
    rank: 7,
    rankChange: 1,
    lastActive: '1 day ago'
  },
  {
    id: '8',
    username: 'PolkadotDev',
    avatar: '🔴',
    points: 2120,
    challengesCompleted: 6,
    streak: 7,
    rank: 8,
    rankChange: -2,
    lastActive: '8 hours ago'
  }
]

export function Leaderboard() {
  const [timeframe, setTimeframe] = useState('all-time')
  const [category, setCategory] = useState('overall')

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-warning fill-warning" />
      case 2:
        return <Medal className="h-5 w-5 text-muted-foreground" />
      case 3:
        return <Award className="h-5 w-5 text-warning" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-3 w-3 text-success" />
    if (change < 0) return <TrendingUp className="h-3 w-3 text-destructive rotate-180" />
    return <span className="h-3 w-3 text-muted-foreground">-</span>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative border-b border-border bg-gradient-card">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Leaderboard</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how you stack up against other developers in the OvertheInk community.
              Complete challenges, earn points, and climb the ranks!
            </p>
          </div>
        </div>

        {/* Coming Soon Overlay */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <X className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Coming Soon</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Players</p>
                    <p className="text-2xl font-bold">2,847</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <Trophy className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Points</p>
                    <p className="text-2xl font-bold">1,250</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <Award className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Top Score</p>
                    <p className="text-2xl font-bold">3,750</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold">458</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row gap-4 mb-8">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="monthly">This Month</SelectItem>
                <SelectItem value="weekly">This Week</SelectItem>
                <SelectItem value="daily">Today</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overall">Overall</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Rankings</span>
                  <Badge variant="outline">{timeframe}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {mockLeaderboard.map((user, index) => (
                    <div
                      key={user.id}
                      className={`flex items-center justify-between p-4 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors ${
                        index < 3 ? 'bg-gradient-card' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex items-center space-x-2 min-w-12">
                          {getRankIcon(user.rank)}
                          {getRankChangeIcon(user.rankChange)}
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{user.avatar}</div>
                          <div>
                            <h3 className="font-semibold">{user.username}</h3>
                            <p className="text-xs text-muted-foreground">
                              Last active {user.lastActive}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-8 text-sm">
                        <div className="text-right hidden sm:block">
                          <p className="font-semibold">{user.points.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">points</p>
                        </div>
                        
                        <div className="text-right hidden md:block">
                          <p className="font-semibold">{user.challengesCompleted}</p>
                          <p className="text-xs text-muted-foreground">completed</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold">{user.streak}</p>
                          <p className="text-xs text-muted-foreground">streak</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline">
                Load More Rankings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
