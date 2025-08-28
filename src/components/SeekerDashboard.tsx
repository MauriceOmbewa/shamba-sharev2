import React, { useState } from 'react';
import { Search, Heart, MessageCircle, Calendar, MapPin, Square, DollarSign } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  type: 'landowner' | 'seeker';
}

interface SeekerDashboardProps {
  user: User;
}

const SeekerDashboard: React.FC<SeekerDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('search');

  // Mock data - replace with real API calls
  const stats = {
    savedListings: 12,
    activeInquiries: 3,
    scheduledVisits: 2,
    watchedListings: 8
  };

  const savedListings = [
    {
      id: '1',
      title: 'Premium Agricultural Land',
      location: 'Iowa, USA',
      size: 150,
      price: 300,
      image: 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'available'
    },
    {
      id: '2',
      title: 'Organic Farm Plot',
      location: 'California, USA',
      size: 75,
      price: 500,
      image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'available'
    }
  ];

  const inquiries = [
    {
      id: '1',
      landTitle: 'Premium Agricultural Land',
      landowner: 'John Smith',
      date: '2024-01-15',
      status: 'pending',
      lastMessage: 'Thank you for your interest. The land is still available.'
    },
    {
      id: '2',
      landTitle: 'Vineyard Estate',
      landowner: 'Maria Garcia',
      date: '2024-01-14',
      status: 'responded',
      lastMessage: 'Would you like to schedule a site visit?'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Lease Seeker Dashboard</h1>
        <p className="text-gray-300">Welcome back, {user.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-dark-green p-6 rounded-lg">
          <div className="flex items-center">
            <Heart className="w-8 h-8 text-olive-green mr-3" />
            <div>
              <p className="text-gray-300 text-sm">Saved Listings</p>
              <p className="text-2xl font-bold text-white">{stats.savedListings}</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-green p-6 rounded-lg">
          <div className="flex items-center">
            <MessageCircle className="w-8 h-8 text-olive-green mr-3" />
            <div>
              <p className="text-gray-300 text-sm">Active Inquiries</p>
              <p className="text-2xl font-bold text-white">{stats.activeInquiries}</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-green p-6 rounded-lg">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-olive-green mr-3" />
            <div>
              <p className="text-gray-300 text-sm">Scheduled Visits</p>
              <p className="text-2xl font-bold text-white">{stats.scheduledVisits}</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-green p-6 rounded-lg">
          <div className="flex items-center">
            <Search className="w-8 h-8 text-olive-green mr-3" />
            <div>
              <p className="text-gray-300 text-sm">Watched Listings</p>
              <p className="text-2xl font-bold text-white">{stats.watchedListings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setActiveTab('search')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'search'
              ? 'bg-olive-green text-white'
              : 'bg-dark-green text-gray-300 hover:bg-black-green'
          }`}
        >
          Search Land
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'saved'
              ? 'bg-olive-green text-white'
              : 'bg-dark-green text-gray-300 hover:bg-black-green'
          }`}
        >
          Saved Listings
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'inquiries'
              ? 'bg-olive-green text-white'
              : 'bg-dark-green text-gray-300 hover:bg-black-green'
          }`}
        >
          My Inquiries
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'profile'
              ? 'bg-olive-green text-white'
              : 'bg-dark-green text-gray-300 hover:bg-black-green'
          }`}
        >
          Profile & Settings
        </button>
      </div>

      {/* Content */}
      {activeTab === 'search' && (
        <div className="space-y-6">
          <div className="bg-dark-green p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Find Your Perfect Land</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter location..."
                  className="w-full px-3 py-2 rounded-lg bg-very-dark-green text-white placeholder-gray-400 border border-gray-600 focus:border-olive-green focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Max Price per Acre</label>
                <select className="w-full px-3 py-2 rounded-lg bg-very-dark-green text-white border border-gray-600 focus:border-olive-green focus:outline-none">
                  <option value="">Any Price</option>
                  <option value="300">Up to $300</option>
                  <option value="500">Up to $500</option>
                  <option value="800">Up to $800</option>
                </select>
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Min Size (acres)</label>
                <input
                  type="number"
                  placeholder="Minimum size..."
                  className="w-full px-3 py-2 rounded-lg bg-very-dark-green text-white placeholder-gray-400 border border-gray-600 focus:border-olive-green focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-4">
              <button className="flex items-center px-6 py-2 bg-olive-green text-white rounded-lg hover:bg-army-green transition-colors">
                <Search className="w-4 h-4 mr-2" />
                Search Land
              </button>
            </div>
          </div>

          <div className="bg-dark-green p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Searches</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-very-dark-green rounded">
                <span className="text-white">Iowa farmland under $400/acre</span>
                <button className="text-olive-green hover:text-white transition-colors">Search again</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-very-dark-green rounded">
                <span className="text-white">California organic certified land</span>
                <button className="text-olive-green hover:text-white transition-colors">Search again</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'saved' && (
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">Saved Listings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedListings.map((listing) => (
              <div key={listing.id} className="bg-dark-green rounded-lg overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{listing.title}</h3>
                  
                  <div className="flex flex-wrap gap-4 text-gray-300 text-sm mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {listing.location}
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      {listing.size} acres
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      ${listing.price}/acre
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-olive-green text-white rounded hover:bg-army-green transition-colors">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'inquiries' && (
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">My Inquiries</h2>
          
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="bg-dark-green p-6 rounded-lg">
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-white">{inquiry.landTitle}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        inquiry.status === 'pending' ? 'bg-yellow-600 text-white' : 'bg-green-600 text-white'
                      }`}>
                        {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-2">
                      Landowner: <span className="text-olive-green">{inquiry.landowner}</span>
                    </p>
                    <p className="text-gray-300 mb-2">"{inquiry.lastMessage}"</p>
                    <p className="text-gray-400 text-sm">Sent: {inquiry.date}</p>
                  </div>

                  <div className="flex flex-col gap-2 mt-4 lg:mt-0 lg:ml-4">
                    <button className="px-4 py-2 bg-olive-green text-white rounded hover:bg-army-green transition-colors">
                      Reply
                    </button>
                    <button className="px-4 py-2 bg-dark-green border border-gray-600 text-white rounded hover:bg-black-green transition-colors">
                      View Land
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-dark-green p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={user.name}
                  className="w-full px-3 py-2 rounded-lg bg-very-dark-green text-white border border-gray-600 focus:border-olive-green focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={user.email}
                  className="w-full px-3 py-2 rounded-lg bg-very-dark-green text-white border border-gray-600 focus:border-olive-green focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full px-3 py-2 rounded-lg bg-very-dark-green text-white placeholder-gray-400 border border-gray-600 focus:border-olive-green focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Preferred Location</label>
                <input
                  type="text"
                  placeholder="Enter preferred location"
                  className="w-full px-3 py-2 rounded-lg bg-very-dark-green text-white placeholder-gray-400 border border-gray-600 focus:border-olive-green focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-6">
              <button className="px-6 py-2 bg-olive-green text-white rounded-lg hover:bg-army-green transition-colors">
                Update Profile
              </button>
            </div>
          </div>

          <div className="bg-dark-green p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Lease Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Farming Type</label>
                <select className="w-full px-3 py-2 rounded-lg bg-very-dark-green text-white border border-gray-600 focus:border-olive-green focus:outline-none">
                  <option value="">Select farming type</option>
                  <option value="organic">Organic Farming</option>
                  <option value="conventional">Conventional Farming</option>
                  <option value="livestock">Livestock</option>
                  <option value="mixed">Mixed Use</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Max Budget per Acre</label>
                  <input
                    type="number"
                    placeholder="Enter max budget"
                    className="w-full px-3 py-2 rounded-lg bg-very-dark-green text-white placeholder-gray-400 border border-gray-600 focus:border-olive-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Min Land Size (acres)</label>
                  <input
                    type="number"
                    placeholder="Enter minimum size"
                    className="w-full px-3 py-2 rounded-lg bg-very-dark-green text-white placeholder-gray-400 border border-gray-600 focus:border-olive-green focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button className="px-6 py-2 bg-olive-green text-white rounded-lg hover:bg-army-green transition-colors">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeekerDashboard;