import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/ui/CartItem';
import Button from '../components/ui/Button';

const Cart: React.FC = () => {
  const { items, clearCart, subtotal } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="bg-white p-12 rounded-lg shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-5">
            <ShoppingCart size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added any products to your cart yet.
            Browse our catalog to find products you'll love.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="border-b border-gray-200 pb-3 mb-3 flex justify-between">
              <h2 className="text-lg font-medium text-gray-900">Cart Items ({items.length})</h2>
              <button
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Clear Cart
              </button>
            </div>
            
            {items.map(item => (
              <CartItem key={item.product.id} item={item} />
            ))}
            
            <div className="mt-6">
              <Link 
                to="/"
                className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-3 mb-4">
              Order Summary
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900 font-medium">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (7%)</span>
                <span className="text-gray-900 font-medium">${tax.toFixed(2)}</span>
              </div>
              
              {subtotal < 100 && (
                <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-md">
                  Add ${(100 - subtotal).toFixed(2)} more to qualify for free shipping!
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between items-center">
                <span className="text-gray-900 font-medium">Total</span>
                <span className="text-xl text-gray-900 font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Link to="/checkout">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  rightIcon={<ArrowRight size={16} />}
                >
                  Proceed to Checkout
                </Button>
              </Link>
              
              <div className="mt-4 text-xs text-gray-500 text-center">
                All prices include taxes. Additional shipping fees may apply.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;