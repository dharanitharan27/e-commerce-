import React from 'react';
import { Link } from 'react-router-dom';
import { Trash, Minus, Plus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { product, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const increaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <Link to={`/product/${product.id}`} className="flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-20 h-20 object-cover rounded-md"
        />
      </Link>
      
      <div className="ml-4 flex-grow">
        <Link 
          to={`/product/${product.id}`} 
          className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
        >
          {product.name}
        </Link>
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center border rounded-md">
            <button 
              onClick={decreaseQuantity}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              <Minus size={14} />
            </button>
            <span className="px-2 py-1 text-center w-10">{quantity}</span>
            <button 
              onClick={increaseQuantity}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              <Plus size={14} />
            </button>
          </div>
          
          <div className="flex items-center">
            <span className="font-bold text-gray-900 mr-4">
              ${(product.price * quantity).toFixed(2)}
            </span>
            <button 
              onClick={() => removeFromCart(product.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove item"
            >
              <Trash size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;