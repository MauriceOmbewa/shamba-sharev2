import React from 'react';
import { MapPin, Square, DollarSign, Eye } from 'lucide-react';

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

interface LandCardProps {
  listing: LandListing;
}

const LandCard: React.FC<LandCardProps> = ({ listing }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-600 text-white';
      case 'pending':
        return 'bg-yellow-600 text-white';
      case 'leased':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="bg-dark-green rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(listing.status)}`}>
            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{listing.title}</h3>
        
        {/* Location and Size */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-300">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{listing.location}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Square className="w-4 h-4 mr-1" />
            <span className="text-sm">{listing.size} {listing.priceUnit}s</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center mb-4">
          <DollarSign className="w-5 h-5 text-olive-green mr-1" />
          <span className="text-2xl font-bold text-white">
            ${listing.price}
          </span>
          <span className="text-gray-300 ml-1">/{listing.priceUnit}</span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {listing.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {listing.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-very-dark-green text-olive-green text-xs rounded-full"
            >
              {feature}
            </span>
          ))}
          {listing.features.length > 3 && (
            <span className="px-2 py-1 bg-very-dark-green text-gray-400 text-xs rounded-full">
              +{listing.features.length - 3} more
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          className="w-full flex items-center justify-center px-4 py-3 bg-olive-green text-white rounded-lg hover:bg-army-green transition-colors group/btn"
          disabled={listing.status === 'leased'}
        >
          <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
          {listing.status === 'leased' ? 'Not Available' : 'View Details'}
        </button>
      </div>
    </div>
  );
};

export default LandCard;