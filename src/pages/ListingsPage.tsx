import React, { useState } from 'react';
import { Search, Filter, MapPin, Square, DollarSign } from 'lucide-react';
import LandCard from '../components/LandCard';

interface LandListing {
  id: string;
  title: string;
  location: string;
  size: number;
  price: number;
  priceUnit: 'acre' | 'hectare';
  status: 'available' | 'pending' | 'leased';
  image: string;
  description: string;
  features: string[];
}

const ListingsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sizeRange, setSizeRange] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - replace with real API call
  const mockListings: LandListing[] = [
    {
      id: '1',
      title: 'Premium Agricultural Land',
      location: 'Iowa, USA',
      size: 150,
      price: 300,
      priceUnit: 'acre',
      status: 'available',
      image: 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Fertile farmland with excellent soil quality, perfect for corn and soybean cultivation.',
      features: ['Irrigation System', 'Road Access', 'Fertile Soil', 'Equipment Barn']
    },
    {
      id: '2',
      title: 'Organic Farm Plot',
      location: 'California, USA',
      size: 75,
      price: 500,
      priceUnit: 'acre',
      status: 'available',
      image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Certified organic land with greenhouse facilities and water rights included.',
      features: ['Organic Certified', 'Greenhouse', 'Water Rights', 'Solar Power']
    },
    {
      id: '3',
      title: 'Grazing Pasture Land',
      location: 'Texas, USA',
      size: 300,
      price: 200,
      priceUnit: 'acre',
      status: 'pending',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Expansive pasture land ideal for cattle grazing with natural water sources.',
      features: ['Natural Water', 'Fencing', 'Cattle Facilities', 'Hay Storage']
    },
    {
      id: '4',
      title: 'Vineyard Estate',
      location: 'Napa Valley, CA',
      size: 50,
      price: 800,
      priceUnit: 'acre',
      status: 'available',
      image: 'https://images.pexels.com/photos/207231/pexels-photo-207231.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Established vineyard with mature vines and wine production facilities.',
      features: ['Mature Vines', 'Wine Cellar', 'Tasting Room', 'Tourist Access']
    },
    {
      id: '5',
      title: 'Sustainable Farm Land',
      location: 'Oregon, USA',
      size: 120,
      price: 350,
      priceUnit: 'acre',
      status: 'available',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Eco-friendly farmland with renewable energy systems and sustainable practices.',
      features: ['Wind Power', 'Composting System', 'Native Plants', 'Wildlife Corridor']
    },
    {
      id: '6',
      title: 'Market Garden Plot',
      location: 'Florida, USA',
      size: 25,
      price: 600,
      priceUnit: 'acre',
      status: 'available',
      image: 'https://images.pexels.com/photos/2132251/pexels-photo-2132251.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Small-scale intensive farming plot perfect for vegetables and herbs.',
      features: ['Greenhouse', 'Drip Irrigation', 'Market Access', 'Storage Facility']
    }
  ];

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