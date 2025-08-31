# Smart Contract Deployment Guide - Remix IDE

This guide will help you deploy the LandListing smart contract to Base Sepolia testnet using Remix IDE.

## Prerequisites

1. **Coinbase Wallet or MetaMask** with Base Sepolia testnet configured
2. **Base Sepolia ETH** for gas fees (get from [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet))
3. **Remix IDE** access at [remix.ethereum.org](https://remix.ethereum.org)

## Base Sepolia Network Configuration

If you haven't added Base Sepolia to your wallet yet:

- **Network Name**: Base Sepolia
- **RPC URL**: `https://sepolia.base.org`
- **Chain ID**: `84532`
- **Currency Symbol**: `ETH`
- **Block Explorer**: `https://sepolia.basescan.org`

## Step-by-Step Deployment

### 1. Open Remix IDE

1. Go to [remix.ethereum.org](https://remix.ethereum.org)
2. Create a new workspace or use the default workspace

### 2. Create the Contract File

1. In the File Explorer, create a new file: `contracts/LandListing.sol`
2. Copy the entire content from `contracts/LandListing.sol` in your project
3. The contract uses OpenZeppelin imports, so Remix will automatically resolve them

### 3. Compile the Contract

1. Go to the **Solidity Compiler** tab (second icon in the sidebar)
2. Select compiler version `0.8.19` or higher
3. Click **Compile LandListing.sol**
4. Ensure there are no compilation errors

### 4. Deploy to Base Sepolia

1. Go to the **Deploy & Run Transactions** tab (third icon in the sidebar)
2. In the **Environment** dropdown, select **Injected Provider - MetaMask**
3. Make sure your wallet is connected to **Base Sepolia** network
4. Ensure you have some Base Sepolia ETH for gas fees
5. Select **LandListing** from the contract dropdown
6. Click **Deploy**
7. Confirm the transaction in your wallet

### 5. Verify Deployment

1. After deployment, you'll see the contract address in the **Deployed Contracts** section
2. Copy the contract address - you'll need this for the frontend integration
3. You can interact with the contract directly in Remix to test functions

### 6. Get Contract ABI

1. In the **Solidity Compiler** tab, scroll down to find your compiled contract
2. Click on **LandListing** to expand it
3. Copy the **ABI** - you'll need this for the frontend integration

## Contract Functions Overview

### For Landowners:
- `createListing()` - Create a new land listing
- `approveLease()` - Approve a lease request
- `cancelListing()` - Cancel a listing
- `getOwnerListings()` - Get all listings owned by an address

### For Lease Seekers:
- `requestLease()` - Request to lease land (requires payment)
- `getAvailableListings()` - Get all available listings

### For Everyone:
- `getListing()` - Get details of a specific listing
- `getTotalListings()` - Get total number of listings
- `getLeaseRequests()` - Get lease requests for a listing

## Testing the Contract

After deployment, you can test the contract directly in Remix:

1. **Create a Test Listing**:
   ```
   createListing(
     "Test Farm Land",
     "Nakuru County, Kenya", 
     50,
     "1000000000000000000", // 1 ETH in wei
     0, // Acre
     "Test description",
     ["Water Access", "Road Access"]
   )
   ```

2. **Get Available Listings**:
   ```
   getAvailableListings()
   ```

3. **Get Listing Details**:
   ```
   getListing(1) // For listing ID 1
   ```

## Important Notes

- **Gas Costs**: Each transaction requires Base Sepolia ETH for gas
- **Price Units**: 0 = Acre, 1 = Hectare
- **Listing Status**: 0 = Available, 1 = Pending, 2 = Leased, 3 = Cancelled
- **Wei Conversion**: 1 ETH = 1,000,000,000,000,000,000 wei

## Next Steps

After successful deployment:

1. **Copy the contract address** from Remix
2. **Copy the ABI** from the compiler artifacts
3. **Update your frontend** with the real contract address and ABI
4. **Test the integration** with your Base mini app

## Troubleshooting

- **Out of Gas**: Increase gas limit in your wallet
- **Transaction Failed**: Check you have enough Base Sepolia ETH
- **Network Issues**: Ensure you're connected to Base Sepolia
- **Compilation Errors**: Check Solidity version is 0.8.19+

## Contract Address Storage

Once deployed, save these details:

```
Contract Address: [COPY FROM REMIX]
Network: Base Sepolia (Chain ID: 84532)
Deployment Block: [COPY FROM TRANSACTION]
```

You'll need the contract address to update your frontend integration!
