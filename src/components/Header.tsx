import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun, ChevronDown, Trophy, Globe, Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/contexts/ThemeContext'
import { WalletButton } from '@/components/WalletButton'

export function Header() {
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [selectedNetwork, setSelectedNetwork] = useState('Polkadot')

  const languages = ['English', 'Spanish', 'French', 'German', 'Japanese']
  const networks = ['Polkadot', 'Kusama', 'Rococo', 'Westend']

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/home"
          className="flex items-center space-x-2 transition-colors hover:text-primary"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground font-bold text-sm">
            OI
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            OvertheInk
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 px-3">
                <Languages className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{selectedLanguage}</span>
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={selectedLanguage === lang ? 'bg-muted' : ''}
                >
                  {lang}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Networks Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 px-3">
                <Globe className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{selectedNetwork}</span>
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {networks.map((network) => (
                <DropdownMenuItem
                  key={network}
                  onClick={() => setSelectedNetwork(network)}
                  className={selectedNetwork === network ? 'bg-muted' : ''}
                >
                  {network}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Leaderboard Link */}
          <Link to="/leaderboard">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`h-9 px-3 ${location.pathname === '/leaderboard' ? 'bg-muted' : ''}`}
            >
              <Trophy className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Leaderboard</span>
            </Button>
          </Link>

          {/* Wallet Connection */}
          <WalletButton />

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}
