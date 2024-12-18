'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

type WishlistItem = {
  id: string
  name: string
  price: number
}

type WishlistContextType = {
  wishlistItems: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prevItems => {
      if (!prevItems.some(i => i.id === item.id)) {
        return [...prevItems, item]
      }
      return prevItems
    })
  }

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const isInWishlist = (id: string) => {
    return wishlistItems.some(item => item.id === id)
  }

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, clearWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

