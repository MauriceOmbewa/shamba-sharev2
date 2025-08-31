import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Leaf } from 'lucide-react';
import { useWeb3Auth } from '../contexts/Web3AuthContext';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    type: 'seeker' as 'landowner' | 'seeker'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { connect, setUserType, isConnected, user } = useWeb3Auth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected && user) {
      navigate('/dashboard');
    }
  }, [isConnected, user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!isConnected) {
        // First connect the wallet
        await connect();
      }

      // Set the user type after connection
      if (formData.type) {
        setUserType(formData.type);
      }

      navigate('/dashboard');
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-very-dark-green flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Leaf className="w-12 h-12 text-olive-green" />
          </div>
          <h2 className="text-3xl font-bold text-white">Join LandLease</h2>
          <p className="mt-2 text-gray-300">Connect your wallet and choose your account type</p>
        </div>

        {/* Registration Form */}
        <div className="bg-dark-green p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-600 text-white p-3 rounded-lg text-sm">
                {error}
              </div>
            )}



            <div className="text-center mb-6">
              <p className="text-gray-300 text-sm">
                Connect your wallet to create your account. Your wallet address will be used as your unique identifier.
              </p>
            </div>

            <div>
              <label htmlFor="type" className="block text-white text-sm font-medium mb-2">
                Account Type
              </label>
              <select
                id="type"
                name="type"
                required
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-very-dark-green text-white border border-gray-600 focus:border-olive-green focus:outline-none"
              >
                <option value="seeker">Land Seeker - Looking for land to lease</option>
                <option value="landowner">Land Owner - Have land to lease</option>
              </select>
            </div>



            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-olive-green focus:ring-olive-green border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                I agree to the{' '}
                <a href="#" className="text-olive-green hover:text-white transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-olive-green hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 bg-olive-green text-white rounded-lg hover:bg-army-green focus:outline-none focus:ring-2 focus:ring-olive-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <UserPlus className="w-4 h-4 mr-2" />
              )}
{isLoading ? 'Connecting Wallet...' : 'Connect Wallet & Join'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-olive-green hover:text-white transition-colors font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;