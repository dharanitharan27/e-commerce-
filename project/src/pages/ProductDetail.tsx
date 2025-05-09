import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Heart, ShoppingCart, Truck, ArrowLeft, Shield, Star } from 'lucide-react';
import { getProductById, products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(Number(id));
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">The product you are looking for does not exist.</p>
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight size={12} />
            <Link to={`/category/${product.category}`} className="hover:text-blue-600 capitalize">
              {product.category}
            </Link>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>
      
      {/* Product */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={`${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">{product.rating} ({product.reviews} reviews)</span>
            </div>
            
            <div className="text-2xl font-bold text-gray-900 mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
              <p className="text-gray-700">
                {product.description}
              </p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-medium text-gray-900">Quantity</h2>
                <span className={`${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              <div className="flex items-center mb-6">
                <button 
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  disabled={!product.inStock}
                  className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  disabled={!product.inStock}
                  className="w-20 px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none disabled:opacity-50"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                  className="px-3 py-2 border border-gray-300 rounded-r-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                >
                  +
                </button>
              </div>
              
              <div className="flex space-x-4 mb-6">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  variant="primary"
                  size="lg"
                  fullWidth
                  leftIcon={<ShoppingCart size={16} />}
                >
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<Heart size={16} />}
                >
                  Wishlist
                </Button>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-start mb-4">
                <Truck className="h-6 w-6 text-gray-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Free Shipping</h3>
                  <p className="text-gray-600 text-sm">Free standard shipping on orders over $35</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-gray-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">30-Day Returns</h3>
                  <p className="text-gray-600 text-sm">Shop with confidence with our hassle-free return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;