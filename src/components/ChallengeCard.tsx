import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Circle, Star, Clock, Users, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChallengeWithContract } from '@/data/challenges'

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

interface ChallengeCardProps {
  challenge: ChallengeWithContract
}

const difficultyColors = {
  Beginner: 'bg-success text-success-foreground',
  Intermediate: 'bg-warning text-warning-foreground',
  Advanced: 'bg-primary text-primary-foreground',
  Expert: 'bg-destructive text-destructive-foreground'
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="challenge-card group relative overflow-hidden rounded-xl border border-card-border bg-gradient-card p-4 transition-all duration-300 hover:border-primary/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Completion Status */}
      <div className="absolute top-4 right-4">
        {challenge.completed ? (
          <CheckCircle className="h-5 w-5 text-success" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground" />
        )}
      </div>

      {/* Challenge Icon */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-3xl">
        {challenge.icon}
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {challenge.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {challenge.description}
          </p>
        </div>

        {/* Difficulty Badge */}
        <div className="flex items-center space-x-2">
          <Badge className={`${difficultyColors[challenge.difficulty]} text-xs`}>
            {challenge.difficulty}
          </Badge>
          {challenge.contractMetadata && (
            <Badge variant="outline" className="text-xs flex items-center space-x-1">
              <Shield className="h-3 w-3" />
              <span>Blockchain</span>
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{challenge.estimatedTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{challenge.participants}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 fill-warning text-warning" />
            <span>{challenge.points}</span>
          </div>
        </div>

        {/* Action Button */}
        <Link to={`/challenge/${challenge.id}`} className="block">
          <Button 
            className={`w-full transition-all duration-300 ${
              challenge.completed 
                ? 'bg-success hover:bg-success/90' 
                : 'bg-primary hover:bg-hover'
            } ${isHovered ? 'shadow-glow' : ''}`}
            size="sm"
          >
            {challenge.completed ? 'Review Solution' : 'Start Challenge'}
          </Button>
        </Link>
      </div>
    </div>
  )
}
