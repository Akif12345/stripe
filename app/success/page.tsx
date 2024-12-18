'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/components/CartContext'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const { clearCart } = useCart()

  useEffect(() => {
    // Clear the cart after successful checkout
    clearCart()
  }, [clearCart])

  const sessionId = searchParams.get('session_id')

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center">
      <div className="bg-card rounded-xl p-8 shadow-xl text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Purchase!</h1>
        <p className="mb-4">Your order has been successfully processed.</p>
        {sessionId && (
          <p className="mb-4 text-sm text-muted-foreground">
            Order ID: {sessionId}
          </p>
        )}
        <Button asChild>
          <Link href="/">
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  )
}