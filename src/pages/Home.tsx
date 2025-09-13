import { useState, useMemo } from 'react'
import { Trophy, Users, Clock } from 'lucide-react'
import { ChallengeCard } from '@/components/ChallengeCard'
import { BlockchainStatus } from '@/components/BlockchainStatus'
import { Button } from '@/components/ui/button'
import { challenges } from '@/data/challenges'

export function Home() {
  const filteredAndSortedChallenges = useMemo(() => {
    return challenges
  }, [])

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
            <p className="text-sm text-white/70 mt-2">
              Play Now
            </p>

          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-glow/20 backdrop-blur-sm" />
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Blockchain Status */}
          <BlockchainStatus />

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
        </div>
      </section>
    </div>
  )
}
