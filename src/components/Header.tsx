import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-dark-green shadow-lg relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-white hover:text-olive-green transition-colors">
            <Leaf className="w-8 h-8" />
            <span className="text-xl font-bold">LandLease</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-olive-green transition-colors">Home</Link>
            <Link to="/listings" className="text-white hover:text-olive-green transition-colors">Listings</Link>
            <Link to="/about" className="text-white hover:text-olive-green transition-colors">About</Link>
            <Link to="/contact" className="text-white hover:text-olive-green transition-colors">Contact</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-white hover:text-olive-green transition-colors">Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="bg-olive-green text-white px-4 py-2 rounded-lg hover:bg-army-green transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-olive-green transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-olive-green text-white px-4 py-2 rounded-lg hover:bg-army-green transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-olive-green transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-olive-green">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-white hover:text-olive-green transition-colors" onClick={closeMenu}>Home</Link>
              <Link to="/listings" className="text-white hover:text-olive-green transition-colors" onClick={closeMenu}>Listings</Link>
              <Link to="/about" className="text-white hover:text-olive-green transition-colors" onClick={closeMenu}>About</Link>
              <Link to="/contact" className="text-white hover:text-olive-green transition-colors" onClick={closeMenu}>Contact</Link>
              
              {user ? (
                <>
                  <Link to="/dashboard" className="text-white hover:text-olive-green transition-colors" onClick={closeMenu}>Dashboard</Link>
                  <button
                    onClick={handleLogout}
                    className="bg-olive-green text-white px-4 py-2 rounded-lg hover:bg-army-green transition-colors text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white hover:text-olive-green transition-colors"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-olive-green text-white px-4 py-2 rounded-lg hover:bg-army-green transition-colors inline-block text-center"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;