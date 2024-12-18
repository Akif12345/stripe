'use client'

import { useState, useEffect } from 'react'
import ProductGrid from '@/components/ProductGrid'
import CartDrawer from '@/components/CartDrawer'
import Checkout from '@/components/Checkout'
import Footer from '@/components/Footer'
import Login from '@/components/Login'
import { categories } from './data/categories'

export default function Home() {
  const [products, setProducts] = useState(Object.values(categories).flatMap(category => category.products))
  const [cartItems, setCartItems] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState(null)
  const [currency, setCurrency] = useState('USD')

  useEffect(() => {
    // Simulating dynamic pricing
    const interval = setInterval(() => {
      setProducts(prevProducts =>
        prevProducts.map(product => ({
          ...product,
          currentPrice: Number((product.basePrice * (0.9 + Math.random() * 0.2)).toFixed(2))
        }))
      )
    }, 30000) // Update prices every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const toggleWishlist = (productId) => {
    setWishlistItems(prevItems => {
      if (prevItems.includes(productId)) {
        return prevItems.filter(id => id !== productId)
      } else {
        return [...prevItems, productId]
      }
    })
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    const filteredProducts = Object.values(categories).flatMap(category => 
      category.products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    )
    setProducts(filteredProducts)
  }

  const handleLogin = (email, password) => {
    // Here you would typically authenticate the user
    console.log('Login attempted with:', email, password)
    setUser({ email })
    setIsLoginOpen(false)
    // Generate a coupon for the logged-in user
    const coupon = {
      code: 'WELCOME10',
      discount: 0.1 // 10% discount
    }
    alert(`Welcome! Here's your coupon code: ${coupon.code}`)
  }

  const handleLogout = () => {
    setUser(null)
  }

  const handlePlaceOrder = (orderData) => {
    // Generate a random order ID
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase()
    console.log('Order placed:', { ...orderData, items: cartItems, orderId })
    // Here you would typically send an email to the user
    alert(`Thank you for shopping! Your order ID is ${orderId}. A confirmation email has been sent to ${user.email}.`)
    setCartItems([])
    setIsCheckoutOpen(false)
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlistItems.length

  return (
    <main className="min-h-screen flex flex-col">
      {isCheckoutOpen ? (
        <Checkout 
          cartItems={cartItems} 
          onPlaceOrder={handlePlaceOrder}
          coupon={{ code: 'WELCOME10', discount: 0.1 }}
          currency={currency}
        />
      ) : (
        <ProductGrid 
          products={products} 
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          wishlistItems={wishlistItems}
          currency={currency}
        />
      )}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemoveFromCart={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false)
          setIsCheckoutOpen(true)
        }}
        currency={currency}
      />
      {isLoginOpen && (
        <Login 
          onLogin={handleLogin}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
      <Footer />
    </main>
  )
}

