const generateRandomRating = () => Number((Math.random() * 2 + 3).toFixed(1));

export const categories = {
  'phones-accessories': {
    name: 'Phones & Accessories',
    products: [
      { id: 'phone-1', name: 'iPhone 19 Pro', basePrice: 999.99, currentPrice: 949.99, image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 2500 },
      { id: 'phone-2', name: 'Samsung Galaxy S23', basePrice: 899.99, currentPrice: 849.99, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 2100 },
      { id: 'phone-3', name: 'Google Pixel 7', basePrice: 799.99, currentPrice: 749.99, image: 'https://images.unsplash.com/photo-1635870723802-e88d76ae3252?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 1800 },
      { id: 'phone-4', name: 'OnePlus 10 Pro', basePrice: 899.99, currentPrice: 849.99, image: 'https://images.unsplash.com/photo-1676315115527-0b2d7a297b57?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 1600 },
      { id: 'acc-1', name: 'Premium Phone Case', basePrice: 29.99, currentPrice: 24.99, image: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 3500 },
      { id: 'acc-2', name: 'Wireless Charger', basePrice: 39.99, currentPrice: 34.99, image: 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 2800 },
      { id: 'acc-3', name: 'Pop Socket', basePrice: 9.99, currentPrice: 7.99, image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 4200 },
      { id: 'acc-4', name: 'Screen Protector', basePrice: 14.99, currentPrice: 12.99, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 3900 },
      { id: 'acc-5', name: 'Car Phone Mount', basePrice: 24.99, currentPrice: 19.99, image: 'https://images.unsplash.com/photo-1615834275251-d931f1e8b8e4?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 2100 },
      { id: 'acc-6', name: 'Power Bank', basePrice: 49.99, currentPrice: 44.99, image: 'https://images.unsplash.com/photo-1609592786605-c9ecc2d0973e?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 3300 },
    ]
  },
  'laptops-computers': {
    name: 'Laptops & Computers',
    products: [
      { id: 'laptop-1', name: 'MacBook Pro M2', basePrice: 1499.99, currentPrice: 1399.99, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 1800 },
      { id: 'laptop-2', name: 'Dell XPS 15', basePrice: 1299.99, currentPrice: 1199.99, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 1500 },
      { id: 'laptop-3', name: 'Lenovo ThinkPad X1', basePrice: 1399.99, currentPrice: 1299.99, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 1300 },
      { id: 'laptop-4', name: 'HP Spectre x360', basePrice: 1199.99, currentPrice: 1099.99, image: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 1400 },
      { id: 'desktop-1', name: 'iMac 24"', basePrice: 1299.99, currentPrice: 1249.99, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 1100 },
      { id: 'desktop-2', name: 'Custom Gaming PC', basePrice: 1999.99, currentPrice: 1899.99, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 900 },
      { id: 'monitor-1', name: '27" 4K Monitor', basePrice: 399.99, currentPrice: 349.99, image: 'https://images.unsplash.com/photo-1527443060795-0d2c21ff5bca?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 2200 },
      { id: 'keyboard-1', name: 'Mechanical Keyboard', basePrice: 129.99, currentPrice: 119.99, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 2800 },
      { id: 'mouse-1', name: 'Ergonomic Mouse', basePrice: 79.99, currentPrice: 69.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 3100 },
      { id: 'accessory-1', name: 'USB-C Hub', basePrice: 59.99, currentPrice: 49.99, image: 'https://images.unsplash.com/photo-1636389573704-81bafb9d3830?w=800&h=600&fit=crop', rating: generateRandomRating(), orderCount: 2600 },
    ]
  },
  'shoes-footwear': {
    name: 'Shoes & Footwear',
    products: [
      {
        id: 'shoe-1',
        name: 'Nike Air Max',
        basePrice: 129.99,
        currentPrice: 119.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop',
        rating: 4.7,
        orderCount: 4200
      },
      {
        id: 'shoe-2',
        name: 'Adidas Ultraboost',
        basePrice: 159.99,
        currentPrice: 139.99,
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=600&fit=crop',
        rating: 4.8,
        orderCount: 3800
      }
    ]
  },
  'clothing': {
    name: 'Clothing',
    products: [
      {
        id: 'cloth-1',
        name: 'Premium Cotton T-Shirt',
        basePrice: 29.99,
        currentPrice: 24.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
        rating: 4.5,
        orderCount: 5200
      },
      {
        id: 'cloth-2',
        name: 'Denim Jacket',
        basePrice: 89.99,
        currentPrice: 79.99,
        image: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=800&h=600&fit=crop',
        rating: 4.6,
        orderCount: 2800
      }
    ]
  },
  'watches': {
    name: 'Watches',
    products: [
      {
        id: 'watch-1',
        name: 'Classic Chronograph',
        basePrice: 199.99,
        currentPrice: 179.99,
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=600&fit=crop',
        rating: 4.7,
        orderCount: 1900
      },
      {
        id: 'watch-2',
        name: 'Smart Watch Pro',
        basePrice: 299.99,
        currentPrice: 279.99,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=600&fit=crop',
        rating: 4.8,
        orderCount: 2200
      }
    ]
  },
  'audio-headphones': {
    name: 'Audio & Headphones',
    products: [
      {
        id: 'audio-1',
        name: 'Noise Cancelling Headphones',
        basePrice: 249.99,
        currentPrice: 229.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
        rating: 4.8,
        orderCount: 3200
      },
      {
        id: 'audio-2',
        name: 'Wireless Earbuds Pro',
        basePrice: 159.99,
        currentPrice: 139.99,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=600&fit=crop',
        rating: 4.7,
        orderCount: 4100
      }
    ]
  }
}

export const currencies = {
  INR: { symbol: '₹', rate: 83.5 },
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 }
}

