'use client';

import { useState } from 'react';
import { menuItems } from '@/data/menu';
import { useCart } from '@/hooks/useCart';
import { MenuItem } from '@/types/menu';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { cartItems, addToCart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  const categories = ['all', 'appetizers', 'mains', 'desserts', 'drinks'];
  
  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    
    setIsCheckingOut(true);
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: getTotalPrice(),
          currency: 'TTD'
        })
      });

      const data = await response.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <header className="bg-orange-600 text-white p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">🦜 Toucan Restaurant</h1>
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-400 flex items-center gap-2"
          >
            🛒 Cart ({getTotalItems()})
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-orange-800">Menu Categories</h2>
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-orange-600 border border-orange-600 hover:bg-orange-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredItems.map((item: MenuItem) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold text-orange-800 mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-3">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-orange-600">
                  {formatPrice(item.price)}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-500"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {isCartOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-orange-800">Your Cart</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty</p>
              ) : (
                <>
                  {cartItems.map(cartItem => (
                    <div key={cartItem.item.id} className="flex justify-between items-center py-3 border-b">
                      <div className="flex-1">
                        <h4 className="font-semibold">{cartItem.item.name}</h4>
                        <p className="text-sm text-gray-600">
                          {formatPrice(cartItem.item.price)} each
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                          className="bg-gray-200 w-8 h-8 rounded-full hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{cartItem.quantity}</span>
                        <button
                          onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                          className="bg-gray-200 w-8 h-8 rounded-full hover:bg-gray-300"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(cartItem.item.id)}
                          className="text-red-500 ml-2 hover:text-red-700"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold">Total:</span>
                      <span className="text-xl font-bold text-orange-600">
                        {formatPrice(getTotalPrice())}
                      </span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-500 disabled:bg-gray-400"
                    >
                      {isCheckingOut ? 'Processing...' : 'Checkout with WAM Pay'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
