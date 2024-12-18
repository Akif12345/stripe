'use client'

import { useWishlist } from '@/components/WishlistContext'
import { useCart } from '@/components/CartContext'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-8 shadow-xl"
        >
          <h1 className="text-3xl font-bold text-center mb-8">Your Wishlist</h1>
          {wishlistItems.length === 0 ? (
            <p className="text-center text-muted-foreground">Your wishlist is empty.</p>
          ) : (
            <>
              {wishlistItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={() => addToCart({ ...item, quantity: 1 })}>
                      Add to Cart
                    </Button>
                    <Button variant="destructive" onClick={() => removeFromWishlist(item.id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-8 pt-4 border-t">
                <div className="flex justify-between">
                  <Button variant="outline" onClick={clearWishlist}>Clear Wishlist</Button>
                  <Link href="/">
                    <Button>Continue Shopping</Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}

