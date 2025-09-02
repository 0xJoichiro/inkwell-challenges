import { useState, useMemo } from 'react'
import { Search, Filter, Trophy, Users, Clock } from 'lucide-react'
import { ChallengeCard } from '@/components/ChallengeCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { challenges } from '@/data/challenges'

export function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [sortBy, setSortBy] = useState('popularity')

  const filteredAndSortedChallenges = useMemo(() => {
    let filtered = challenges.filter(challenge => {
      const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDifficulty = difficultyFilter === 'all' || challenge.difficulty === difficultyFilter
      return matchesSearch && matchesDifficulty
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.participants - a.participants
        case 'difficulty':
          const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'Expert': 4 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        case 'points':
          return b.points - a.points
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, difficultyFilter, sortBy])

  const stats = {
    totalChallenges: challenges.length,
    totalParticipants: challenges.reduce((sum, c) => sum + c.participants, 0),
    completedChallenges: challenges.filter(c => c.completed).length
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 text-center">
        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <h1 className="text-4xl font-bold text-white md:text-6xl">
              Master Ink Smart Contracts
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Challenge yourself with progressively difficult Ink smart contract security puzzles.
              Learn by doing, secure by design.
            </p>
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="flex items-center space-x-2 text-white/80">
                <Trophy className="h-5 w-5" />
                <span className="text-sm font-medium">{stats.totalChallenges} Challenges</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">{stats.totalParticipants.toLocaleString()} Participants</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-medium">Learn at your pace</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-glow/20 backdrop-blur-sm" />
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Filters */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                <Input
                  placeholder="Search challenges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="difficulty">Difficulty</SelectItem>
                <SelectItem value="points">Points</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredAndSortedChallenges.length} of {challenges.length} challenges
            </p>
          </div>

          {/* Challenge Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSortedChallenges.map((challenge, index) => (
              <div
                key={challenge.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ChallengeCard challenge={challenge} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAndSortedChallenges.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto max-w-md space-y-4">
                <div className="text-6xl">🔍</div>
                <h3 className="text-lg font-semibold">No challenges found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search terms or filters to find challenges.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('')
                    setDifficultyFilter('all')
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}