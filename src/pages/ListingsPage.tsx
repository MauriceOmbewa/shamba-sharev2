import React, { useState } from 'react';
import { Search, Filter, MapPin, Square, DollarSign } from 'lucide-react';
import LandCard from '../components/LandCard';
import { useLandListings } from '../hooks/useLandListings';
import { formatEther } from 'viem';

const ListingsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sizeRange, setSizeRange] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { availableListingIds, isLoading } = useLandListings();

  // For now, we'll show the listing IDs until we implement full listing details fetching
  // In a production app, you'd fetch the full details for each listing
  const mockListings = availableListingIds?.map(id => ({
    id: id.toString(),
    owner: '0x0000000000000000000000000000000000000000',
    title: `Land Listing #${id.toString()}`,
    location: 'Base Sepolia Network',
    size: 50,
    price: BigInt('1000000000000000000'),
    priceUnit: 'acre' as const,
    status: 'available' as const,
    description: 'This listing is loaded from the blockchain. Full details coming soon!',
    features: ['Onchain Verified', 'Smart Contract Managed'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })) || [];

  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || listing.location.includes(selectedLocation);

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-very-dark-green py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Available Land Listings
          </h1>
          <p className="text-xl text-gray-300">
            Find the perfect land for your agricultural needs
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-dark-green rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-very-dark-green text-white placeholder-gray-400 border border-gray-600 focus:border-olive-green focus:outline-none"
              />
            </div>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 rounded-lg bg-very-dark-green text-white border border-gray-600 focus:border-olive-green focus:outline-none"
            >
              <option value="">All Locations</option>
              <option value="Iowa">Iowa</option>
              <option value="California">California</option>
              <option value="Texas">Texas</option>
              <option value="Oregon">Oregon</option>
              <option value="Florida">Florida</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 bg-olive-green text-white rounded-lg hover:bg-army-green transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-600">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Price Range (per acre)</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-very-dark-green text-white border border-gray-600 focus:border-olive-green focus:outline-none"
                >
                  <option value="">Any Price</option>
                  <option value="0-300">$0 - $300</option>
                  <option value="300-500">$300 - $500</option>
                  <option value="500-800">$500 - $800</option>
                  <option value="800+">$800+</option>
                </select>
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Land Size (acres)</label>
                <select
                  value={sizeRange}
                  onChange={(e) => setSizeRange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-very-dark-green text-white border border-gray-600 focus:border-olive-green focus:outline-none"
                >
                  <option value="">Any Size</option>
                  <option value="0-50">0 - 50 acres</option>
                  <option value="50-150">50 - 150 acres</option>
                  <option value="150-300">150 - 300 acres</option>
                  <option value="300+">300+ acres</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-300">
            Showing {filteredListings.length} of {mockListings.length} listings
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <LandCard key={listing.id} listing={listing} />
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-300 text-xl">No listings match your search criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;