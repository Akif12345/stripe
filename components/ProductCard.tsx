import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { currencies } from '@/app/data/categories'
import { useCart } from '@/components/CartContext'
import { useWishlist } from '@/components/WishlistContext'

interface ProductCardProps {
  product: any;
  currency?: keyof typeof currencies;
}

export default function ProductCard({ 
  product,
  currency = 'USD' 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const formatPrice = (price: number) => {
    const convertedPrice = price * currencies[currency].rate
    return `${currencies[currency].symbol}${convertedPrice.toFixed(2)}`
  }

  const discount = ((product.basePrice - product.currentPrice) / product.basePrice * 100).toFixed(0)

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.currentPrice
      })
    }
  }

  return (
    <motion.div
      className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <Image 
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 ${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-500'} ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity bg-white/80 hover:bg-white`}
          onClick={handleToggleWishlist}
        >
          <Heart className="h-5 w-5" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
        </Button>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-card-foreground">{product.name}</h3>
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-muted-foreground line-through">
              {formatPrice(product.basePrice)}
            </p>
            <p className="text-2xl font-bold text-primary">
              {formatPrice(product.currentPrice)}
            </p>
          </div>
          {Number(discount) > 0 && (
            <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-sm font-semibold">
              {discount}% OFF
            </span>
          )}
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
            ))}
            <span className="ml-1 text-sm text-gray-500">
              {typeof product.rating === 'number' ? product.rating.toFixed(1) : 'N/A'}
            </span>
          </div>
          <span className="text-sm text-gray-500">{product.orderCount.toLocaleString()} orders</span>
        </div>
        <Button 
          className="w-full bg-primary hover:bg-primary/90"
          onClick={() => addToCart({ 
            id: product.id, 
            name: product.name, 
            price: product.currentPrice, 
            quantity: 1 
          })}
        >
          Add to Cart
        </Button>
      </div>
    </motion.div>
  )
}

