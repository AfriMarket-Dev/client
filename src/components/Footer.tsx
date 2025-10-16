import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  onAboutClick?: () => void;
  onHelpClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAboutClick, onHelpClick }) => {
  const footerSections = [
    {
      title: 'Marketplace',
      links: [
        'Browse Suppliers',
        'Product Categories',
        'Featured Products',
        'New Arrivals',
        'Bulk Orders'
      ]
    },
    {
      title: 'For Suppliers',
      links: [
        'Join as Supplier',
        'Supplier Dashboard',
        'List Products',
        'Manage Orders',
        'Success Stories'
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', onClick: onHelpClick },
        'Contact Us',
        'Shipping Info',
        'Payment Methods',
        'Return Policy'
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', onClick: onAboutClick },
        'Our Mission',
        'Careers',
        'Press',
        'Blog'
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                AfrikaMarket
              </h2>
              <p className="text-sm text-gray-400 mt-1">Wholesale Hub</p>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Africa's premier wholesale marketplace connecting trusted suppliers 
              with retailers across the continent. Building bridges for business growth.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
                <span className="text-sm">Pan-African Coverage</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
                <span className="text-sm">support@afrikamarket.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
                <span className="text-sm">24/7 Support Available</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {typeof link === 'object' && link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href="#"
                        className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                      >
                        {typeof link === 'string' ? link : link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 AfrikaMarket. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;