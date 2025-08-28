import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black-green text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="w-6 h-6 text-olive-green" />
              <span className="text-xl font-bold">LandLease</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Connecting landowners with lease seekers for sustainable agricultural partnerships.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-olive-green transition-colors text-sm">Home</Link></li>
              <li><Link to="/listings" className="text-gray-300 hover:text-olive-green transition-colors text-sm">Listings</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-olive-green transition-colors text-sm">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-olive-green transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-300 text-sm">Land Leasing</span></li>
              <li><span className="text-gray-300 text-sm">Property Management</span></li>
              <li><span className="text-gray-300 text-sm">Agricultural Consulting</span></li>
              <li><span className="text-gray-300 text-sm">Contract Management</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-olive-green" />
                <span className="text-gray-300 text-sm">info@landlease.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-olive-green" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-olive-green" />
                <span className="text-gray-300 text-sm">123 Farm Road, Agriculture City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-green mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 LandLease. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;