// Smart contract interface for land listings
// This would typically be generated from the actual smart contract ABI

export interface LandListing {
  id: string;
  owner: string;
  title: string;
  location: string;
  size: number;
  price: bigint;
  priceUnit: 'acre' | 'hectare';
  status: 'available' | 'pending' | 'leased';
  description: string;
  features: string[];
  createdAt: number;
  updatedAt: number;
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

// Mock contract address - replace with actual deployed contract
export const LAND_LISTING_CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890';

// Mock ABI - replace with actual contract ABI
export const LAND_LISTING_ABI = [
  {
    "inputs": [
      {"name": "title", "type": "string"},
      {"name": "location", "type": "string"},
      {"name": "size", "type": "uint256"},
      {"name": "price", "type": "uint256"},
      {"name": "priceUnit", "type": "string"},
      {"name": "description", "type": "string"},
      {"name": "features", "type": "string[]"}
    ],
    "name": "createListing",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "listingId", "type": "uint256"}],
    "name": "getListing",
    "outputs": [
      {"name": "owner", "type": "address"},
      {"name": "title", "type": "string"},
      {"name": "location", "type": "string"},
      {"name": "size", "type": "uint256"},
      {"name": "price", "type": "uint256"},
      {"name": "priceUnit", "type": "string"},
      {"name": "status", "type": "uint8"},
      {"name": "description", "type": "string"},
      {"name": "features", "type": "string[]"},
      {"name": "createdAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllListings",
    "outputs": [{"name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "listingId", "type": "uint256"}],
    "name": "requestLease",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
