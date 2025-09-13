import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { ChallengeWithContract } from '@/data/challenges'

const starCount = {
  Beginner: 1,
  Intermediate: 3,
  Advanced: 4,
  Expert: 5
}

export function ChallengeCard({ challenge }: { challenge: ChallengeWithContract }) {
  return (
    <Link to={`/challenge/${challenge.id}`} className="block">
      <div className="challenge-card group relative overflow-hidden rounded-xl border border-card-border bg-card p-4 transition-colors w-1/2 mx-auto h-24">
        <div className="text-center group-hover:opacity-0 transition-opacity duration-200">
          <div className="text-2xl mb-2">
            {challenge.icon}
          </div>
          <h3 className="text-sm font-medium text-card-foreground truncate">
            {challenge.title}
          </h3>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex" role="img" aria-label={`${starCount[challenge.difficulty]} star difficulty`}>
            {Array.from({ length: starCount[challenge.difficulty] }, (_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
