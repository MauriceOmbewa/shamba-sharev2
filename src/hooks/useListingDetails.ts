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

export const useListingDetails = (listingId: string | undefined) => {
  const { data: listingData, isLoading, error, refetch } = useReadContract({
    address: DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
    abi: DEPLOYED_CONTRACT_ABI,
    functionName: 'getListing',
    args: listingId ? [BigInt(listingId)] : undefined,
    query: {
      enabled: !!listingId,
    },
  });

  // Transform the contract data to our LandListing interface
  const listing: LandListing | undefined = listingData ? {
    id: listingId!,
    owner: (listingData as any)[0] as string,
    title: (listingData as any)[1] as string,
    location: (listingData as any)[2] as string,
    size: Number((listingData as any)[3]),
    price: (listingData as any)[4] as bigint,
    priceUnit: getPriceUnitString(Number((listingData as any)[5])),
    status: getStatusString(Number((listingData as any)[6])),
    description: (listingData as any)[7] as string,
    features: (listingData as any)[8] as string[],
    createdAt: Number((listingData as any)[9]),
    updatedAt: Number((listingData as any)[9]), // Using createdAt as updatedAt for now
    currentLessee: (listingData as any)[10] as string,
    leaseEndTime: Number((listingData as any)[11]),
  } : undefined;

  return {
    listing,
    isLoading,
    error,
    refetch,
  };
};
