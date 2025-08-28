import React, { useState } from 'react';
import { Plus, MapPin, Square, DollarSign, Users, Eye, Edit, Trash2 } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  type: 'landowner' | 'seeker';
}

interface LandownerDashboardProps {
  user: User;
}

const LandownerDashboard: React.FC<LandownerDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with real API calls
  const stats = {
    totalLand: 425,
    activeLeasees: 12,
    totalRevenue: 48500,
    pendingRequests: 5
  };

  const listings = [
    {
      id: '1',
      title: 'Premium Agricultural Land',
      location: 'Iowa, USA',
      size: 150,
      price: 300,
      status: 'available',
      inquiries: 8
    },
    {
      id: '2',
      title: 'Organic Farm Plot',
      location: 'California, USA',
      size: 75,
      price: 500,
      status: 'leased',
      inquiries: 0
    },
    {
      id: '3',
      title: 'Grazing Pasture Land',
      location: 'Texas, USA',
      size: 200,
      price: 200,
      status: 'pending',
      inquiries: 3
    }
  ];

  const requests = [
    {
      id: '1',
      seekerName: 'John Smith',
      landTitle: 'Premium Agricultural Land',
      message: 'Interested in long-term lease for organic farming.',
      date: '2024-01-15',
      status: 'pending'
    },
    {
      id: '2',
      seekerName: 'Sarah Johnson',
      landTitle: 'Grazing Pasture Land',
      message: 'Looking for cattle grazing land.',
      date: '2024-01-14',
      status: 'pending'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Landowner Dashboard</h1>
        <p className="text-gray-300">Welcome back, {user.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-dark-green p-6 rounded-lg">
          <div className="flex items-center">
            <Square className="w-8 h-8 text-olive-green mr-3" />
            <div>
              <p className="text-gray-300 text-sm">Total Land</p>
              <p className="text-2xl font-bold text-white">{stats.totalLand} acres</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-green p-6 rounded-lg">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-olive-green mr-3" />
            <div>
              <p className="text-gray-300 text-sm">Active Leasees</p>
              <p className="text-2xl font-bold text-white">{stats.activeLeasees}</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-green p-6 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-olive-green mr-3" />
            <div>
              <p className="text-gray-300 text-sm">Revenue (YTD)</p>
              <p className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-green p-6 rounded-lg">
          <div className="flex items-center">
            <Eye className="w-8 h-8 text-olive-green mr-3" />
            <div>
              <p className="text-gray-300 text-sm">Pending Requests</p>
              <p className="text-2xl font-bold text-white">{stats.pendingRequests}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'overview'
              ? 'bg-olive-green text-white'
              : 'bg-dark-green text-gray-300 hover:bg-black-green'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('listings')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'listings'
              ? 'bg-olive-green text-white'
              : 'bg-dark-green text-gray-300 hover:bg-black-green'
          }`}
        >
          My Listings
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'requests'
              ? 'bg-olive-green text-white'
              : 'bg-dark-green text-gray-300 hover:bg-black-green'
          }`}
        >
          Lease Requests
        </button>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-dark-green p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-very-dark-green rounded">
                <div>
                  <p className="text-white">New inquiry on Premium Agricultural Land</p>
                  <p className="text-gray-400 text-sm">2 hours ago</p>
                </div>
                <span className="px-2 py-1 bg-olive-green text-white rounded text-xs">New</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-very-dark-green rounded">
                <div>
                  <p className="text-white">Lease agreement signed for Organic Farm Plot</p>
                  <p className="text-gray-400 text-sm">1 day ago</p>
                </div>
                <span className="px-2 py-1 bg-green-600 text-white rounded text-xs">Completed</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'listings' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">My Land Listings</h2>
            <button className="flex items-center px-4 py-2 bg-olive-green text-white rounded-lg hover:bg-army-green transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Add New Listing
            </button>
          </div>

          <div className="space-y-4">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-dark-green p-6 rounded-lg">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-white">{listing.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        listing.status === 'available' ? 'bg-green-600 text-white' :
                        listing.status === 'pending' ? 'bg-yellow-600 text-white' :
                        'bg-red-600 text-white'
                      }`}>
                        {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-gray-300 text-sm">
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
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {listing.inquiries} inquiries
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 lg:mt-0">
                    <button className="p-2 bg-olive-green text-white rounded hover:bg-army-green transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'requests' && (
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">Lease Requests</h2>
          
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="bg-dark-green p-6 rounded-lg">
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-white">{request.seekerName}</h3>
                      <span className="px-2 py-1 bg-yellow-600 text-white rounded text-xs">
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-2">
                      Interested in: <span className="text-olive-green">{request.landTitle}</span>
                    </p>
                    <p className="text-gray-300 mb-2">{request.message}</p>
                    <p className="text-gray-400 text-sm">Received: {request.date}</p>
                  </div>

                  <div className="flex flex-col gap-2 mt-4 lg:mt-0 lg:ml-4">
                    <button className="px-4 py-2 bg-olive-green text-white rounded hover:bg-army-green transition-colors">
                      Accept
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                      Decline
                    </button>
                    <button className="px-4 py-2 bg-dark-green border border-gray-600 text-white rounded hover:bg-black-green transition-colors">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandownerDashboard;