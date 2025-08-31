# LandLease Base Mini App

A decentralized land leasing platform built as a Base mini app, enabling secure onchain transactions for agricultural land rentals.

## Features

- **Base Account Integration**: Secure wallet-based authentication using Base Account
- **Onchain Land Listings**: Smart contract-powered land listing management
- **Web3 Native**: Built with wagmi, viem, and OnchainKit for seamless Base integration
- **Responsive Design**: Mobile-first design optimized for all devices

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Web3**: wagmi, viem, @coinbase/onchainkit
- **Build Tool**: Vite
- **Blockchain**: Base (Ethereum L2)

## Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd shamba-sharev2
   npm install
   ```

2. **Environment Variables**
   ```bash
   cp .env.example .env
   # Add your OnchainKit API key from https://portal.cdp.coinbase.com/products/onchainkit
   VITE_ONCHAINKIT_API_KEY=your_api_key_here
   ```

3. **Development**
   ```bash
   npm run dev
   ```

## Base Mini App Deployment

### Prerequisites

- OnchainKit API key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/products/onchainkit)
- Base wallet (Coinbase Wallet recommended)
- Access to Base or Base Sepolia testnet

### Build for Production

```bash
npm run build:base
```

### Deploy to Base

1. **Static Hosting**: Deploy the `dist` folder to any static hosting service:
   - Vercel
   - Netlify
   - IPFS
   - Base's recommended hosting platforms

2. **Domain Configuration**: Ensure your domain is configured for Base mini app requirements

3. **Testing**: Test on Base Sepolia testnet before mainnet deployment

## Smart Contract Integration

The app currently uses mock data for development. To integrate with actual smart contracts:

1. Deploy the land listing smart contract to Base
2. Update `src/contracts/LandListingContract.ts` with the actual contract address and ABI
3. Uncomment the actual contract calls in `src/hooks/useLandListings.ts`

## Base Mini App Features

- **Wallet Connection**: Seamless connection with Base Account and Coinbase Wallet
- **Onchain Authentication**: No traditional login required - wallet-based auth
- **Gas Optimization**: Built for Base's low-cost transactions
- **Mobile Optimized**: Perfect for mobile Base wallet integration

## Usage

1. **Connect Wallet**: Users connect their Base-compatible wallet
2. **Browse Listings**: View available land listings with onchain data
3. **Create Listings**: Landowners can create new listings (requires wallet connection)
4. **Request Leases**: Seekers can request leases for available land
5. **Dashboard**: Manage your listings and lease requests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Base Sepolia
5. Submit a pull request

## License

MIT License - see LICENSE file for details
