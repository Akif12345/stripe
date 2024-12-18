'use client'

import { useCart } from '@/components/CartContext'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import Link from 'next/link'
import CheckoutButton from '@/components/CheckoutButton'

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart()

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-8 shadow-xl"
        >
          <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
          {cartItems.length === 0 ? (
            <p className="text-center text-muted-foreground">Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <Button variant="destructive" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </Button>
                </div>
              ))}
              <div className="mt-8 pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-lg">${total.toFixed(2)}</span>
                </div>
                <div className="flex flex-col space-y-4">
                  <CheckoutButton />
                  <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
                </div>
              </div>
            </>
          )}
          <div className="mt-4 text-center">
            <Link href="/" className="text-primary hover:underline">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}