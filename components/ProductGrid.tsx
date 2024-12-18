'use client'

import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductGrid({ products, onAddToCart }) {
  const [sortedProducts, setSortedProducts] = useState(products)
  const [sortBy, setSortBy] = useState('featured')

  useEffect(() => {
    const sorted = [...products].sort((a, b) => {
      switch (sortBy) {
        case 'priceLowToHigh':
          return a.currentPrice - b.currentPrice
        case 'priceHighToLow':
          return b.currentPrice - a.currentPrice
        case 'nameAZ':
          return a.name.localeCompare(b.name)
        case 'nameZA':
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })
    setSortedProducts(sorted)
  }, [products, sortBy])

  return (
    <div className="flex-grow p-6 bg-background">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-foreground">Featured Products</h2>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
            <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
            <SelectItem value="nameAZ">Name: A to Z</SelectItem>
            <SelectItem value="nameZA">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  )
}

