'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { categories } from '@/app/data/categories'
import ProductGrid from '@/components/ProductGrid'
import { motion } from 'framer-motion'
import { useCart } from '@/components/CartContext'

export default function CategoryPage() {
  const params = useParams()
  const category = categories[params.slug as string]
  const [products, setProducts] = useState(category?.products || [])
  const { addToCart } = useCart()

  useEffect(() => {
    if (category) {
      setProducts(category.products)
    }
  }, [category])

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {category.name}
        </motion.h1>
        <ProductGrid 
          products={products} 
          onAddToCart={(product) => addToCart({ 
            id: product.id, 
            name: product.name, 
            price: product.currentPrice, 
            quantity: 1 
          })}
        />
      </div>
    </div>
  )
}

