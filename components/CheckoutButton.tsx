'use client'

import { useState } from 'react'
import { useCart } from '../components/CartContext'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from "@/components/ui/button"

// Make sure to add your publishable key to your .env.local file
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { cartItems } = useCart()

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        }),
      })

      const { sessionId } = await response.json()
      const stripe = await stripePromise

      const { error } = await stripe!.redirectToCheckout({
        sessionId,
      })

      if (error) {
        console.error('Error:', error)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={isLoading || cartItems.length === 0}
      className="w-full bg-primary hover:bg-primary/90"
    >
      {isLoading ? 'Processing...' : 'Checkout with Stripe'}
    </Button>
  )
}