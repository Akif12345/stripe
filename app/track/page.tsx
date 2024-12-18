'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Package } from 'lucide-react'

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('')
  const [orderStatus, setOrderStatus] = useState<null | {
    status: string;
    date: string;
    location: string;
  }>(null)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate order tracking
    setOrderStatus({
      status: 'In Transit',
      date: new Date().toLocaleDateString(),
      location: 'Mumbai Distribution Center'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-8 shadow-xl"
        >
          <h1 className="text-3xl font-bold text-center mb-8">Track Your Order</h1>
          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <Input
                placeholder="Enter your order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="text-lg py-6"
              />
            </div>
            <Button type="submit" className="w-full py-6 text-lg">
              Track Order
            </Button>
          </form>

          {orderStatus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-secondary rounded-lg"
            >
              <div className="flex items-center justify-center mb-4">
                <Package className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-center mb-4">Order Status</h2>
              <div className="space-y-2">
                <p className="text-center text-lg">
                  Status: <span className="font-semibold">{orderStatus.status}</span>
                </p>
                <p className="text-center text-lg">
                  Last Updated: <span className="font-semibold">{orderStatus.date}</span>
                </p>
                <p className="text-center text-lg">
                  Location: <span className="font-semibold">{orderStatus.location}</span>
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

