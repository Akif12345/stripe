'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion } from 'framer-motion'
import { currencies } from '@/app/data/categories'

interface CheckoutProps {
  cartItems: any[];
  onPlaceOrder: (data: any) => void;
  coupon?: { code: string; discount: number };
  currency?: keyof typeof currencies;
}

export default function Checkout({ cartItems, onPlaceOrder, coupon, currency = 'USD' }: CheckoutProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    paymentMethod: 'credit-card'
  })
  const [appliedCoupon, setAppliedCoupon] = useState(coupon)
  const [couponCode, setCouponCode] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase()
    onPlaceOrder({ ...formData, orderId, coupon: appliedCoupon })
  }

  const applyCoupon = () => {
    if (coupon && couponCode === coupon.code) {
      setAppliedCoupon(coupon)
    } else {
      alert('Invalid coupon code')
    }
  }

  const formatPrice = (price: number) => {
    const convertedPrice = price * currencies[currency].rate
    return `${currencies[currency].symbol}${convertedPrice.toFixed(2)}`
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0)
  const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0
  const total = subtotal - discount

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" value={formData.country} onChange={handleInputChange} required />
            </div>
          </div>
          <div>
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
          </div>
          <div>
            <Label>Payment Method</Label>
            <RadioGroup name="paymentMethod" value={formData.paymentMethod} onValueChange={(value) => setFormData(prevData => ({ ...prevData, paymentMethod: value }))}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card">Credit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="bg-secondary/50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>{formatPrice(item.currentPrice * item.quantity)}</span>
            </div>
          ))}
          <div className="border-t pt-4 mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({appliedCoupon.code}):</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <div className="bg-secondary/50 p-6 rounded-lg">
          <Label htmlFor="coupon">Coupon Code</Label>
          <div className="flex space-x-2">
            <Input
              id="coupon"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
            />
            <Button type="button" onClick={applyCoupon}>Apply</Button>
          </div>
          {coupon && (
            <p className="text-sm text-muted-foreground mt-2">
              Use code <span className="font-mono font-bold">{coupon.code}</span> for {coupon.discount * 100}% off!
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">Place Order</Button>
      </form>
    </motion.div>
  )
}

