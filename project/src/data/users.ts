import { User, Order } from '../types';

export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

export const orders: Order[] = [
  {
    id: 1,
    items: [
      {
        product: {
          id: 1,
          name: "Classic White Shirt",
          description: "A timeless white shirt made from premium cotton.",
          price: 49.99,
          image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          category: "clothing",
          rating: 4.5,
          reviews: 120,
          inStock: true
        },
        quantity: 1
      },
      {
        product: {
          id: 4,
          name: "Leather Wallet",
          description: "Handcrafted genuine leather wallet with multiple card slots.",
          price: 39.99,
          image: "https://images.pexels.com/photos/2643698/pexels-photo-2643698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          category: "accessories",
          rating: 4.4,
          reviews: 78,
          inStock: true
        },
        quantity: 1
      }
    ],
    total: 89.98,
    status: "delivered",
    date: "2023-09-15",
    shippingAddress: {
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      zipCode: "02108",
      country: "USA"
    }
  },
  {
    id: 2,
    items: [
      {
        product: {
          id: 2,
          name: "Wireless Headphones",
          description: "Premium wireless headphones with noise cancellation.",
          price: 199.99,
          image: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          category: "electronics",
          rating: 4.8,
          reviews: 350,
          inStock: true
        },
        quantity: 1
      }
    ],
    total: 199.99,
    status: "shipped",
    date: "2023-11-22",
    shippingAddress: {
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      zipCode: "02108",
      country: "USA"
    }
  }
];

export const getUserById = (id: number): User | undefined => {
  return users.find(user => user.id === id);
};

export const getOrdersByUserId = (userId: number): Order[] => {
  // In a real app, orders would be linked to users
  // For this demo, we'll just return all orders for any user
  return orders;
};