import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Classic White Shirt",
    description: "A timeless white shirt made from premium cotton. Perfect for any formal or semi-formal occasion.",
    price: 49.99,
    image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "clothing",
    rating: 4.5,
    reviews: 120,
    inStock: true
  },
  {
    id: 2,
    name: "Wireless Headphones",
    description: "Premium wireless headphones with noise cancellation and 24-hour battery life.",
    price: 199.99,
    image: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "electronics",
    rating: 4.8,
    reviews: 350,
    inStock: true
  },
  {
    id: 3,
    name: "Running Shoes",
    description: "Lightweight and comfortable running shoes with excellent support and durability.",
    price: 89.99,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "footwear",
    rating: 4.6,
    reviews: 215,
    inStock: true
  },
  {
    id: 4,
    name: "Leather Wallet",
    description: "Handcrafted genuine leather wallet with multiple card slots and RFID protection.",
    price: 39.99,
    image: "https://images.pexels.com/photos/2643698/pexels-photo-2643698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "accessories",
    rating: 4.4,
    reviews: 78,
    inStock: true
  },
  {
    id: 5,
    name: "Smartwatch",
    description: "Advanced smartwatch with health tracking, notifications, and a 7-day battery life.",
    price: 249.99,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "electronics",
    rating: 4.7,
    reviews: 189,
    inStock: true
  },
  {
    id: 6,
    name: "Denim Jacket",
    description: "Classic denim jacket that never goes out of style. Made from high-quality materials.",
    price: 79.99,
    image: "https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "clothing",
    rating: 4.3,
    reviews: 92,
    inStock: true
  },
  {
    id: 7,
    name: "Ceramic Coffee Mug",
    description: "Elegant ceramic coffee mug with a comfortable handle and minimalist design.",
    price: 14.99,
    image: "https://images.pexels.com/photos/1251833/pexels-photo-1251833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "home",
    rating: 4.2,
    reviews: 65,
    inStock: true
  },
  {
    id: 8,
    name: "Wireless Earbuds",
    description: "Compact wireless earbuds with touch controls and a portable charging case.",
    price: 129.99,
    image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "electronics",
    rating: 4.6,
    reviews: 278,
    inStock: true
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};