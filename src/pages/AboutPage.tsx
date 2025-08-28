import React from 'react';
import { Users, Target, Eye, Award, Heart, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Trust & Transparency',
      description: 'We believe in building lasting relationships through honest communication and transparent processes.'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'Supporting environmentally responsible farming practices that benefit both land and community.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Creating a supportive network where landowners and farmers can thrive together.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to providing the highest quality service and platform experience for our users.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: '15+ years in agricultural consulting and land management.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Technology leader with expertise in agricultural tech solutions.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/3785081/pexels-photo-3785081.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Operations specialist focused on streamlining land lease processes.'
    }
  ];

  return (
    <div className="min-h-screen bg-very-dark-green py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About LandLease</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're passionate about connecting landowners with lease seekers to create 
            sustainable agricultural partnerships that benefit everyone involved.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-dark-green p-8 rounded-lg">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-olive-green mr-3" />
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              To revolutionize land leasing by creating a trusted, transparent platform 
              that connects agricultural landowners with responsible lease seekers. We 
              facilitate partnerships that promote sustainable farming practices and 
              strengthen rural communities.
            </p>
          </div>

          <div className="bg-dark-green p-8 rounded-lg">
            <div className="flex items-center mb-6">
              <Eye className="w-8 h-8 text-olive-green mr-3" />
              <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              To become the leading platform for agricultural land leasing globally, 
              fostering a world where every piece of farmland reaches its full potential 
              through responsible stewardship and innovative farming practices.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-300">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-dark-green p-6 rounded-lg hover:bg-black-green transition-colors group">
                  <value.icon className="w-12 h-12 text-olive-green mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Story */}
        <div className="mb-20">
          <div className="bg-dark-green p-8 md:p-12 rounded-lg">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg text-gray-300 max-w-4xl mx-auto">
              <p className="leading-relaxed mb-6">
                LandLease was born from a simple observation: too much good agricultural land 
                sits unused while passionate farmers struggle to find affordable, quality land 
                to cultivate. Our founder, Sarah Johnson, experienced this firsthand when her 
                family's farm was looking to lease unused acreage while local organic farmers 
                couldn't find suitable land.
              </p>
              <p className="leading-relaxed mb-6">
                What started as informal networking within the local farming community quickly 
                grew into a vision for a comprehensive platform. We realized that technology 
                could bridge the gap between landowners and lease seekers, creating more 
                opportunities for sustainable agriculture and rural economic growth.
              </p>
              <p className="leading-relaxed">
                Today, LandLease serves thousands of users across multiple states, facilitating 
                partnerships that have brought over 50,000 acres of farmland into productive 
                use. We're proud to support both established agricultural operations and the 
                next generation of farmers who are passionate about sustainable, innovative 
                farming practices.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-300">
              Passionate professionals dedicated to revolutionizing land leasing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-dark-green p-6 rounded-lg text-center hover:bg-black-green transition-colors">
                <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-olive-green font-medium mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-dark-green p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl text-gray-300 mb-6">
            Whether you're looking to lease land or find the perfect partner, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-olive-green text-white px-8 py-3 rounded-lg hover:bg-army-green transition-colors">
              Get Started Today
            </button>
            <button className="border-2 border-olive-green text-olive-green px-8 py-3 rounded-lg hover:bg-olive-green hover:text-white transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;