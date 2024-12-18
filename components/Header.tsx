'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ShoppingCart, Heart, User, ChevronDown, Globe, LogOut } from 'lucide-react'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { categories, currencies } from '@/app/data/categories'
import { useCart } from '../components/CartContext'
import { useWishlist } from '../components/WishlistContext'
import { useSearch } from '../components/SearchContext'
import Login from './Login'

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [currency, setCurrency] = useState('USD')
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const { cartItems } = useCart()
  const { wishlistItems } = useWishlist()
  const { searchQuery, setSearchQuery } = useSearch()
  const router = useRouter()

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlistItems.length

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempted with:', email, password)
    setUser({ email })
    setIsLoginOpen(false)
    const coupon = {
      code: 'WELCOME10',
      discount: 0.1
    }
    alert(`Welcome! Here's your coupon code: ${coupon.code}`)
  }

  const handleLogout = () => {
    setUser(null)
  }

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency)
  }

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/track" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Track order
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors">
                <span>Shop by Category</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {Object.entries(categories).map(([slug, category]) => (
                  <DropdownMenuItem key={slug}>
                    <Link href={`/category/${slug}`} className="w-full">
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Logo */}
          <div className="flex-1 flex items-center justify-center lg:justify-center">
            <Link href="/" className="text-2xl font-bold tracking-wider text-primary">
              SAGACITY
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors">
                <Globe className="h-5 w-5" />
                <span className="hidden lg:inline-block">Currency</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Object.keys(currencies).map((curr) => (
                  <DropdownMenuItem key={curr} onSelect={() => handleCurrencyChange(curr)}>
                    {curr} ({currencies[curr].symbol})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-foreground hover:text-primary transition-colors"
            >
              <Search className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "text-foreground hover:text-primary transition-colors",
                    user && "text-green-500"
                  )}
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user ? (
                  <>
                    <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onSelect={() => setIsLoginOpen(true)}>Log in</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-foreground hover:text-primary transition-colors relative"
            >
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-foreground hover:text-primary transition-colors relative"
            >
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>

        {/* Search Panel */}
        <div className={cn(
          "overflow-hidden transition-all duration-300",
          isSearchOpen ? "h-16" : "h-0"
        )}>
          <div className="py-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pr-10"
                value={searchQuery}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (newValue !== searchQuery) {
                    setSearchQuery(newValue);
                  }
                }}
              />
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
      {isLoginOpen && (
        <Login 
          onLogin={handleLogin}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
    </header>
  )
}

