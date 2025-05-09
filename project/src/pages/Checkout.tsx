import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { CreditCard, Truck, MapPin, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

const Checkout: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [orderComplete, setOrderComplete] = useState(false);
  
  if (items.length === 0 && !orderComplete) {
    return <Navigate to="/cart" />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login?redirect=checkout" />;
  }
  
  const shipping = shippingMethod === 'express' ? 14.99 : (subtotal >= 100 ? 0 : 9.99);
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };
  
  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo(0, 0);
  };
  
  const handlePlaceOrder = () => {
    // In a real app, this would send the order to the backend
    setOrderComplete(true);
    clearCart();
    window.scrollTo(0, 0);
  };
  
  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            We've sent a confirmation email with order details.
          </p>
          <div className="border-t border-gray-200 pt-6 mt-6">
            <p className="text-gray-500 mb-6">
              Order reference: <span className="font-medium">#ORD-{Math.floor(Math.random() * 10000)}</span>
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Continue Shopping
              </Link>
              <Link
                to="/profile"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                View Your Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link to="/cart" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft size={16} className="mr-2" />
          Back to Cart
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      {/* Progress Indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <div 
            className={`flex flex-col items-center flex-1 ${
              step >= 1 ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${
              step >= 1 ? 'bg-blue-600' : 'bg-gray-300'
            }`}>
              <MapPin size={20} />
            </div>
            <div className="text-sm mt-2">Shipping</div>
          </div>
          <div className={`flex-1 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div 
            className={`flex flex-col items-center flex-1 ${
              step >= 2 ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${
              step >= 2 ? 'bg-blue-600' : 'bg-gray-300'
            }`}>
              <CreditCard size={20} />
            </div>
            <div className="text-sm mt-2">Payment</div>
          </div>
          <div className={`flex-1 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div 
            className={`flex flex-col items-center flex-1 ${
              step >= 3 ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${
              step >= 3 ? 'bg-blue-600' : 'bg-gray-300'
            }`}>
              3
            </div>
            <div className="text-sm mt-2">Review</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            {step === 1 && (
              <form onSubmit={handleSubmitShipping}>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State / Province
                      </label>
                      <input
                        type="text"
                        id="state"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        id="zip"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Method</h3>
                  
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-md p-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="shipping"
                          value="standard"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <div className="ml-3 flex-grow">
                          <div className="font-medium">Standard Shipping</div>
                          <div className="text-sm text-gray-600">
                            {subtotal >= 100 ? 'Free' : '$9.99'} (3-5 business days)
                          </div>
                        </div>
                        <div>
                          <Truck size={20} className="text-gray-400" />
                        </div>
                      </label>
                    </div>
                    
                    <div className="border border-gray-200 rounded-md p-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="shipping"
                          value="express"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <div className="ml-3 flex-grow">
                          <div className="font-medium">Express Shipping</div>
                          <div className="text-sm text-gray-600">
                            $14.99 (1-2 business days)
                          </div>
                        </div>
                        <div>
                          <Truck size={20} className="text-blue-500" />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                  >
                    Continue to Payment
                  </Button>
                </div>
              </form>
            )}
            
            {step === 2 && (
              <form onSubmit={handleSubmitPayment}>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="border border-gray-200 rounded-md p-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="credit"
                        checked={paymentMethod === 'credit'}
                        onChange={() => setPaymentMethod('credit')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <div className="font-medium">Credit Card</div>
                      </div>
                    </label>
                    
                    {paymentMethod === 'credit' && (
                      <div className="mt-4 pl-7 space-y-4">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">
                              Expiration Date
                            </label>
                            <input
                              type="text"
                              id="expDate"
                              placeholder="MM/YY"
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              placeholder="123"
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            id="nameOnCard"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <div className="font-medium">PayPal</div>
                      </div>
                    </label>
                    
                    {paymentMethod === 'paypal' && (
                      <div className="mt-4 pl-7">
                        <p className="text-sm text-gray-600 mb-4">
                          You will be redirected to PayPal to complete your purchase securely.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-8 flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                  >
                    Continue to Review
                  </Button>
                </div>
              </form>
            )}
            
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Order</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Items</h3>
                    <div className="border rounded-md divide-y">
                      {items.map(item => (
                        <div key={item.product.id} className="flex py-4 px-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-16 w-16 object-cover rounded-md"
                          />
                          <div className="ml-4 flex-grow">
                            <h4 className="text-sm font-medium text-gray-900">{item.product.name}</h4>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                              <span className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping</h3>
                      <div className="bg-gray-50 rounded-md p-4">
                        <p className="font-medium">John Doe</p>
                        <p className="text-gray-600">123 Main St</p>
                        <p className="text-gray-600">Apt 4B</p>
                        <p className="text-gray-600">Boston, MA 02108</p>
                        <p className="text-gray-600">United States</p>
                        <p className="text-gray-600 mt-2">+1 (555) 123-4567</p>
                        
                        <div className="border-t border-gray-200 mt-3 pt-3">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Shipping Method:</span>{' '}
                            {shippingMethod === 'express' ? 'Express (1-2 days)' : 'Standard (3-5 days)'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Payment</h3>
                      <div className="bg-gray-50 rounded-md p-4">
                        <p className="font-medium">
                          {paymentMethod === 'credit' ? 'Credit Card' : 'PayPal'}
                        </p>
                        {paymentMethod === 'credit' && (
                          <>
                            <p className="text-gray-600">Visa ending in 1234</p>
                            <p className="text-gray-600">Expires 12/25</p>
                          </>
                        )}
                        {paymentMethod === 'paypal' && (
                          <p className="text-gray-600">john@example.com</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            )}
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
                <span className="text-gray-600">Subtotal ({items.length} items)</span>
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
              
              <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between items-center">
                <span className="text-gray-900 font-medium">Total</span>
                <span className="text-xl text-gray-900 font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-6 text-xs text-gray-500">
              By placing your order, you agree to our{' '}
              <a href="#" className="text-blue-600">Terms of Service</a> and{' '}
              <a href="#" className="text-blue-600">Privacy Policy</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;