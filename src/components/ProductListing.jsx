import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, LogOut } from 'lucide-react';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Laptop', price: 999.99, image: 'https://m.media-amazon.com/images/I/510uTHyDqGL._AC_UF1000,1000_QL80_.jpg' },
  { id: 2, name: 'Smartphone', price: 599.99, image: 'https://m.media-amazon.com/images/I/41GAnuY2-DL._SX300_SY300_QL70_FMwebp_.jpg' },
  { id: 3, name: 'Headphones', price: 199.99, image: 'https://m.media-amazon.com/images/I/31QB73-5IEL._SX300_SY300_QL70_FMwebp_.jpg' },
  { id: 4, name: 'Smartwatch', price: 249.99, image: 'https://m.media-amazon.com/images/I/61Iw0g8zYYL._SL1500_.jpg' }
];

const ProductListing = () => {
  const [cart, setCart] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigateToCart = () => {
    navigate('/cart', { state: { cart } });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            </div>
            <div className="flex items-center">
              <button 
                onClick={navigateToCart} 
                className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
              </button>
              <button 
                onClick={handleLogout} 
                className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {MOCK_PRODUCTS.map(product => (
            <div 
              key={product.id} 
              className="bg-white overflow-hidden shadow-sm rounded-lg"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="mt-1 text-gray-600">${product.price.toFixed(2)}</p>
                <button 
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;