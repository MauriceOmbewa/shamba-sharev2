import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Users, Shield, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'Find Perfect Land',
      description: 'Browse through our extensive database of available land parcels with detailed information and photos.'
    },
    {
      icon: MapPin,
      title: 'Location Based',
      description: 'Search by specific locations, regions, or proximity to find land that meets your exact requirements.'
    },
    {
      icon: Users,
      title: 'Trusted Community',
      description: 'Connect with verified landowners and lease seekers in our secure, trusted community platform.'
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'All agreements and transactions are protected with our secure platform and legal documentation.'
    }
  ];

  return (
    <div className="bg-very-dark-green">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 23, 7, 0.7), rgba(16, 23, 7, 0.7)), url('https://images.pexels.com/photos/533002/pexels-photo-533002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
          }}
        />
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Connect Land Owners <br />
            <span className="text-olive-green">with Lease Seekers</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
            The trusted platform for sustainable agricultural partnerships. 
            Find the perfect land or connect with reliable partners.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/listings"
              className="bg-olive-green text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-army-green transition-colors inline-flex items-center group"
            >
              Find Land
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/register"
              className="border-2 border-olive-green text-olive-green px-8 py-4 rounded-lg text-lg font-semibold hover:bg-olive-green hover:text-white transition-colors"
            >
              Lease Your Land
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-green">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose LandLease?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We make land leasing simple, secure, and sustainable for everyone involved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-very-dark-green p-6 rounded-lg hover:bg-black-green transition-colors group"
              >
                <feature.icon className="w-12 h-12 text-olive-green mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-very-dark-green">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of landowners and lease seekers who trust LandLease 
            for their agricultural partnerships.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="bg-olive-green text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-army-green transition-colors"
            >
              Join Now - It's Free
            </Link>
            <Link
              to="/about"
              className="text-olive-green hover:text-white transition-colors text-lg"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;