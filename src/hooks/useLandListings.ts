import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import {
  DEPLOYED_CONTRACT_ADDRESS,
  DEPLOYED_CONTRACT_ABI
} from '../contracts/DeployedContract';

// Updated interfaces to match the smart contract
export interface LandListing {
  id: string;
  owner: string;
  title: string;
  location: string;
  size: number;
  price: bigint;
  priceUnit: 'acre' | 'hectare';
  status: 'available' | 'pending' | 'leased' | 'cancelled';
  description: string;
  features: string[];
  createdAt: number;
  updatedAt: number;
  currentLessee?: string;
  leaseEndTime?: number;
}

export interface CreateListingParams {
  title: string;
  location: string;
  size: number;
  price: bigint;
  priceUnit: 'acre' | 'hectare';
  description: string;
  features: string[];
}

// Helper function to convert contract status to string
const getStatusString = (status: number): 'available' | 'pending' | 'leased' | 'cancelled' => {
  switch (status) {
    case 0: return 'available';
    case 1: return 'pending';
    case 2: return 'leased';
    case 3: return 'cancelled';
    default: return 'available';
  }
};

// Helper function to convert price unit to string
const getPriceUnitString = (priceUnit: number): 'acre' | 'hectare' => {
  return priceUnit === 0 ? 'acre' : 'hectare';
};

export const useLandListings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  // Get total number of listings
  const { data: totalListings } = useReadContract({
    address: DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
    abi: DEPLOYED_CONTRACT_ABI,
    functionName: 'getTotalListings',
  });

  // Get available listings
  const { data: availableListingIds } = useReadContract({
    address: DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
    abi: DEPLOYED_CONTRACT_ABI,
    functionName: 'getAvailableListings',
  });

  // For now, we'll use a simplified approach
  // In a production app, you'd want to implement proper listing fetching
  useEffect(() => {
    if (availableListingIds) {
      setIsLoading(false);
      // You can implement detailed listing fetching here
      // For now, we'll rely on the useListingDetails hook for individual listings
    }
  }, [availableListingIds]);

  const createListing = async (params: CreateListingParams) => {
    if (!address) throw new Error('Wallet not connected');

    try {
      const priceUnitNumber = params.priceUnit === 'acre' ? 0 : 1;

      const hash = await writeContract({
        address: DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
        abi: DEPLOYED_CONTRACT_ABI,
        functionName: 'createListing',
        args: [
          params.title,
          params.location,
          BigInt(params.size),
          params.price,
          priceUnitNumber,
          params.description,
          params.features
        ]
      });

      return hash;
    } catch (error) {
      console.error('Failed to create listing:', error);
      throw error;
    }
  };

  const requestLease = async (listingId: string, duration: number, offeredPrice: bigint) => {
    if (!address) throw new Error('Wallet not connected');

    try {
      const hash = await writeContract({
        address: DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
        abi: DEPLOYED_CONTRACT_ABI,
        functionName: 'requestLease',
        args: [BigInt(listingId), BigInt(duration), offeredPrice],
        value: offeredPrice, // Send the payment with the transaction
      });

      return hash;
    } catch (error) {
      console.error('Failed to request lease:', error);
      throw error;
    }
  };

  // Get user's own listings using contract call
  const { data: userListingIds } = useReadContract({
    address: DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
    abi: DEPLOYED_CONTRACT_ABI,
    functionName: 'getOwnerListings',
    args: address ? [address] : undefined,
  });

  return {
    isLoading,
    totalListings: totalListings ? Number(totalListings) : 0,
    availableListingIds: availableListingIds as bigint[] | undefined,
    userListingIds: userListingIds as bigint[] | undefined,
    createListing,
    requestLease,
  };
};
