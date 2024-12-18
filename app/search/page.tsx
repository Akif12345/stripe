'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { categories } from '@/app/data/categories'
import ProductGrid from '@/components/ProductGrid'
import { useSearch } from '@/components/SearchContext'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const { setSearchQuery } = useSearch()
  const [searchResults, setSearchResults] = useState([])

  const query = searchParams.get('q') || ''

  useEffect(() => {
    setSearchQuery(query)
  }, [query, setSearchQuery])

  useEffect(() => {
    if (query) {
      const results = Object.values(categories).flatMap(category => 
        category.products.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase())
        )
      )
      setSearchResults(results)
    }
  }, [query])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Search Results for "{query}"
        </h1>
        {searchResults.length > 0 ? (
          <ProductGrid products={searchResults} />
        ) : (
          <p className="text-center text-muted-foreground">No products found.</p>
        )}
      </div>
    </div>
  )
}

