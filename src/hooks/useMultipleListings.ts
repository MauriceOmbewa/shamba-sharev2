import { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { DEPLOYED_CONTRACT_ADDRESS, DEPLOYED_CONTRACT_ABI } from '../contracts/DeployedContract';
import { LandListing } from './useLandListings';

// Helper functions
const getStatusString = (status: number): 'available' | 'pending' | 'leased' | 'cancelled' => {
  switch (status) {
    case 0: return 'available';
    case 1: return 'pending';
    case 2: return 'leased';
    case 3: return 'cancelled';
    default: return 'available';
  }
};

const getPriceUnitString = (priceUnit: number): 'acre' | 'hectare' => {
  return priceUnit === 0 ? 'acre' : 'hectare';
};

export const useMultipleListings = () => {
  const [listings, setListings] = useState<LandListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get available listing IDs
  const { data: availableListingIds, isLoading: idsLoading } = useReadContract({
    address: DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
    abi: DEPLOYED_CONTRACT_ABI,
    functionName: 'getAvailableListings',
  });

  // Fetch details for each listing
  useEffect(() => {
    const fetchListings = async () => {
      if (!availableListingIds || !Array.isArray(availableListingIds) || idsLoading) {
        return;
      }

      setIsLoading(true);
      const fetchedListings: LandListing[] = [];

      // Note: In a production app, you'd want to batch these calls or use a multicall contract
      // For now, we'll fetch them individually
      for (const listingId of availableListingIds) {
        try {
          // We'll need to implement individual contract calls here
          // For now, let's create a placeholder
          console.log('Would fetch listing:', listingId.toString());
        } catch (error) {
          console.error('Error fetching listing:', listingId.toString(), error);
        }
      }

      setListings(fetchedListings);
      setIsLoading(false);
    };

    fetchListings();
  }, [availableListingIds, idsLoading]);

  return {
    listings,
    isLoading: isLoading || idsLoading,
    availableListingIds: availableListingIds as bigint[] | undefined,
  };
};
