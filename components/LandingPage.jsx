import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const LandingPage = ({ onGetStarted }) => {
  const features = [
    {
      title: 'Real-time Monitoring',
      description: 'Track smart contract activity instantly with live updates every minute',
      icon: '⚡'
    },
    {
      title: 'Detailed Analytics',
      description: 'Comprehensive insights into transaction volumes, gas usage, and token transfers',
      icon: '📊'
    },
    {
      title: 'Multiple Blockchains',
      description: 'Monitor contracts across Ethereum, Arbitrum, Polygon, and more',
      icon: '🔗'
    },
    {
      title: 'Custom Alerts',
      description: 'Get notified about suspicious activity or significant transactions',
      icon: '🔔'
    },
    {
      title: 'API Access',
      description: 'Integrate contract data into your own applications with our REST API',
      icon: '🔌'
    },
    {
      title: 'Security Audits',
      description: 'Built-in vulnerability detection for verified contracts',
      icon: '🔐'
    }
  ];

  return (
    <div className="bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">SC</span>
              </div>
              <span className="hidden sm:inline bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SmartMonitor
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-400 hover:text-white font-medium text-sm transition-colors">Features</a>
              <a href="#" className="text-gray-400 hover:text-white font-medium text-sm transition-colors">Docs</a>
            </div>
            <button
              onClick={onGetStarted}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 sm:pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Monitor Smart Contracts in Real-time
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
            Track transactions, analyze token flows, and detect suspicious activity across all major blockchains with our powerful monitoring platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              Start Monitoring <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              href="#"
              className="px-8 py-3 border-2 border-gray-700 text-gray-300 font-bold rounded-lg hover:border-gray-500 hover:text-white transition-all duration-200"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-gray-700/50 rounded-lg p-6 border border-gray-600 hover:border-gray-500 hover:shadow-lg transition-all duration-200">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Monitoring Smart Contracts Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get real-time insights into blockchain activity across all major networks
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">API</a></li>
                <li><a href="#" className="hover:text-white transition">Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
                <li><a href="#" className="hover:text-white transition">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 SmartMonitor. Monitor smart contracts in real-time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
