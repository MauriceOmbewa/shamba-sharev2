import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { useWeb3Auth } from '../contexts/Web3AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, disconnect, connect, isConnected } = useWeb3Auth();
  const navigate = useNavigate();

  const handleLogout = () => {
    disconnect();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
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
            
            {isConnected && user ? (
              <div className="flex items-center space-x-4">
                <span className="text-olive-green text-sm">
                  {user.address?.slice(0, 6)}...{user.address?.slice(-4)}
                </span>
                <Link to="/dashboard" className="text-white hover:text-olive-green transition-colors">Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="bg-olive-green text-white px-4 py-2 rounded-lg hover:bg-army-green transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleConnect}
                  className="bg-olive-green text-white px-4 py-2 rounded-lg hover:bg-army-green transition-colors"
                >
                  Connect Wallet
                </button>
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
              
              {isConnected && user ? (
                <>
                  <span className="text-olive-green text-sm">
                    {user.address?.slice(0, 6)}...{user.address?.slice(-4)}
                  </span>
                  <Link to="/dashboard" className="text-white hover:text-olive-green transition-colors" onClick={closeMenu}>Dashboard</Link>
                  <button
                    onClick={handleLogout}
                    className="bg-olive-green text-white px-4 py-2 rounded-lg hover:bg-army-green transition-colors text-left"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleConnect();
                    closeMenu();
                  }}
                  className="bg-olive-green text-white px-4 py-2 rounded-lg hover:bg-army-green transition-colors text-left"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;