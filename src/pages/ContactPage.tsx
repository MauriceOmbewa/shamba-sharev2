import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission - replace with real API call
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@landlease.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri 9AM-6PM EST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Farm Road, Agriculture City, AC 12345',
      description: 'Our headquarters'
    }
  ];

  return (
    <div className="min-h-screen bg-very-dark-green py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions about our platform? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-dark-green p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-300">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-very-dark-green text-white placeholder-gray-400 border border-gray-600 focus:border-olive-green focus:outline-none"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-very-dark-green text-white placeholder-gray-400 border border-gray-600 focus:border-olive-green focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-very-dark-green text-white border border-gray-600 focus:border-olive-green focus:outline-none"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-very-dark-green text-white placeholder-gray-400 border border-gray-600 focus:border-olive-green focus:outline-none resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-6 py-3 bg-olive-green text-white rounded-lg hover:bg-army-green transition-colors group"
                >
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Get in Touch</h2>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-dark-green p-6 rounded-lg hover:bg-black-green transition-colors">
                  <div className="flex items-start">
                    <info.icon className="w-6 h-6 text-olive-green mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{info.title}</h3>
                      <p className="text-olive-green font-medium mb-1">{info.details}</p>
                      <p className="text-gray-300 text-sm">{info.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Link */}
            <div className="bg-dark-green p-6 rounded-lg mt-8">
              <h3 className="text-lg font-semibold text-white mb-3">Frequently Asked Questions</h3>
              <p className="text-gray-300 text-sm mb-4">
                Looking for quick answers? Check out our FAQ section for common questions about land leasing, our platform, and getting started.
              </p>
              <button className="text-olive-green hover:text-white transition-colors font-medium">
                View FAQ →
              </button>
            </div>

            {/* Response Time */}
            <div className="bg-olive-green p-4 rounded-lg mt-6">
              <p className="text-white text-sm font-medium text-center">
                📞 Need immediate help? Call us during business hours for instant support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;