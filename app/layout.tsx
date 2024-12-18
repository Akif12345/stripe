import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '../components/CartContext'
import { WishlistProvider } from '../components/WishlistContext'
import { SearchProvider } from '../components/SearchContext'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: 'SAGACITY - Dynamic E-commerce Platform',
  description: 'Experience the future of e-commerce with dynamic pricing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <CartProvider>
          <WishlistProvider>
            <SearchProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </SearchProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}

