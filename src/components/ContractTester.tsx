import React, { useState } from 'react';
import { parseEther } from 'viem';
import { useLandListings } from '../hooks/useLandListings';
import { useListingDetails } from '../hooks/useListingDetails';
import { useWeb3Auth } from '../contexts/Web3AuthContext';

const ContractTester: React.FC = () => {
  const [testListingId, setTestListingId] = useState('1');
  const [isCreating, setIsCreating] = useState(false);
  const { isConnected } = useWeb3Auth();
  const { 
    totalListings, 
    availableListingIds, 
    createListing, 
    isLoading: contractLoading 
  } = useLandListings();
  
  const { listing, isLoading: listingLoading } = useListingDetails(testListingId);

  const handleCreateTestListing = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    setIsCreating(true);
    try {
      const hash = await createListing({
        title: 'Test Farm Land',
        location: 'Base Sepolia Testnet',
        size: 50,
        price: parseEther('0.001'), // 0.001 ETH
        priceUnit: 'acre',
        description: 'Test land listing created from the Base mini app',
        features: ['Test Feature', 'Blockchain Verified', 'Smart Contract']
      });
      
      alert(`Listing created! Transaction hash: ${hash}`);
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing. Check console for details.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-dark-green p-6 rounded-lg">
      <h3 className="text-xl font-bold text-white mb-4">Contract Integration Test</h3>
      
      {/* Connection Status */}
      <div className="mb-4">
        <p className="text-gray-300">
          Wallet Status: <span className={isConnected ? 'text-green-400' : 'text-red-400'}>
            {isConnected ? 'Connected' : 'Not Connected'}
          </span>
        </p>
      </div>

      {/* Contract Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-very-dark-green p-4 rounded">
          <h4 className="text-olive-green font-semibold">Total Listings</h4>
          <p className="text-white text-2xl">
            {contractLoading ? 'Loading...' : totalListings}
          </p>
        </div>
        
        <div className="bg-very-dark-green p-4 rounded">
          <h4 className="text-olive-green font-semibold">Available Listings</h4>
          <p className="text-white text-2xl">
            {contractLoading ? 'Loading...' : availableListingIds?.length || 0}
          </p>
        </div>
      </div>

      {/* Available Listing IDs */}
      {availableListingIds && availableListingIds.length > 0 && (
        <div className="mb-6">
          <h4 className="text-olive-green font-semibold mb-2">Available Listing IDs:</h4>
          <div className="flex flex-wrap gap-2">
            {availableListingIds.map((id) => (
              <span 
                key={id.toString()} 
                className="bg-olive-green text-white px-2 py-1 rounded text-sm"
              >
                #{id.toString()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Create Test Listing */}
      <div className="mb-6">
        <button
          onClick={handleCreateTestListing}
          disabled={!isConnected || isCreating}
          className="bg-olive-green text-white px-4 py-2 rounded hover:bg-army-green disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating ? 'Creating...' : 'Create Test Listing'}
        </button>
        <p className="text-gray-400 text-sm mt-2">
          This will create a test listing on Base Sepolia (requires gas fees)
        </p>
      </div>

      {/* Test Listing Details */}
      <div className="mb-6">
        <h4 className="text-olive-green font-semibold mb-2">Test Listing Details:</h4>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={testListingId}
            onChange={(e) => setTestListingId(e.target.value)}
            placeholder="Enter listing ID"
            className="bg-very-dark-green text-white px-3 py-2 rounded border border-gray-600 focus:border-olive-green focus:outline-none"
          />
          <button
            onClick={() => setTestListingId(testListingId)}
            className="bg-olive-green text-white px-4 py-2 rounded hover:bg-army-green"
          >
            Load
          </button>
        </div>
        
        {listingLoading ? (
          <p className="text-gray-300">Loading listing details...</p>
        ) : listing ? (
          <div className="bg-very-dark-green p-4 rounded">
            <h5 className="text-white font-semibold">{listing.title}</h5>
            <p className="text-gray-300">Location: {listing.location}</p>
            <p className="text-gray-300">Size: {listing.size} {listing.priceUnit}s</p>
            <p className="text-gray-300">Price: {listing.price.toString()} wei</p>
            <p className="text-gray-300">Status: {listing.status}</p>
            <p className="text-gray-300">Owner: {listing.owner}</p>
            <p className="text-gray-300">Description: {listing.description}</p>
            {listing.features.length > 0 && (
              <div className="mt-2">
                <p className="text-gray-300">Features:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {listing.features.map((feature, index) => (
                    <span key={index} className="bg-olive-green text-white px-2 py-1 rounded text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : testListingId ? (
          <p className="text-gray-300">No listing found with ID: {testListingId}</p>
        ) : null}
      </div>

      {/* Instructions */}
      <div className="bg-very-dark-green p-4 rounded">
        <h4 className="text-olive-green font-semibold mb-2">Instructions:</h4>
        <ol className="text-gray-300 text-sm space-y-1">
          <li>1. Make sure your wallet is connected to Base Sepolia</li>
          <li>2. Ensure you have some Base Sepolia ETH for gas fees</li>
          <li>3. Click "Create Test Listing" to create a new listing</li>
          <li>4. Check the available listing IDs above</li>
          <li>5. Enter a listing ID to view its details</li>
        </ol>
      </div>
    </div>
  );
};

export default ContractTester;
