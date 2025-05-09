import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative h-60 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
          
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400'
                        : i < product.rating
                        ? 'text-yellow-300'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.585l-5.196 2.74 1-5.814-4.235-4.123 5.854-.85L10 2.122l2.577 5.416 5.854.85-4.235 4.123 1 5.814L10 15.585z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-gray-500 text-sm ml-1">({product.reviews})</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
              {!product.inStock && (
                <p className="text-red-600 text-sm font-medium">Out of stock</p>
              )}
            </div>
          </div>
        </Link>
        
        {/* Action buttons */}
        <div className="absolute right-0 top-0 m-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col space-y-2">
          <button 
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            title="Add to wishlist"
          >
            <Heart className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2 px-4 rounded-md flex items-center justify-center transition-colors ${
              product.inStock
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 cursor-not-allowed text-gray-500'
            }`}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;