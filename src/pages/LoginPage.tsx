import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Leaf } from 'lucide-react';
import { useWeb3Auth } from '../contexts/Web3AuthContext';

const LoginPage: React.FC = () => {
  const { connect, isConnected, user, isLoading } = useWeb3Auth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected && user) {
      navigate('/dashboard');
    }
  }, [isConnected, user, navigate]);

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div className="min-h-screen bg-very-dark-green flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Leaf className="w-12 h-12 text-olive-green" />
          </div>
          <h2 className="text-3xl font-bold text-white">Connect Your Wallet</h2>
          <p className="mt-2 text-gray-300">Connect your Base wallet to access LandLease</p>
        </div>

        {/* Connection Info */}
        <div className="bg-dark-green p-4 rounded-lg">
          <h3 className="text-white font-semibold mb-2">Base Mini App</h3>
          <div className="text-sm text-gray-300 space-y-1">
            <p>• Connect with Base Account or Coinbase Wallet</p>
            <p>• Secure onchain authentication</p>
            <p>• Access your land listings and dashboard</p>
          </div>
        </div>

        {/* Wallet Connection */}
        <div className="bg-dark-green p-8 rounded-lg shadow-lg">
          <div className="space-y-6">
            {isConnected && user ? (
              <div className="text-center">
                <div className="bg-green-600 text-white p-3 rounded-lg text-sm mb-4">
                  Wallet connected! Redirecting to dashboard...
                </div>
                <p className="text-gray-300">
                  Connected as: {user.address?.slice(0, 6)}...{user.address?.slice(-4)}
                </p>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-3 bg-olive-green text-white rounded-lg hover:bg-army-green focus:outline-none focus:ring-2 focus:ring-olive-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Wallet className="w-4 h-4 mr-2" />
                )}
                {isLoading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm">
              New to Base?{' '}
              <a
                href="https://www.base.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-olive-green hover:text-white transition-colors font-medium"
              >
                Learn more about Base
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;