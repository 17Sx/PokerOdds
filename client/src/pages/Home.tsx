import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CalculatorIcon, 
  ChartBarIcon, 
  AcademicCapIcon,
  PlayIcon,
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl -z-10"></div>
        <div className="flex justify-center mb-8">
          <CalculatorIcon className="h-16 w-16 text-white animate-bounce-slow" />
        </div>
        <h1 className="text-5xl font-bold text-white mb-6 animate-fadeIn">
          Master Your Poker Probabilities
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fadeIn">
          Discover our advanced probability calculator to make more informed decisions at the poker table.
        </p>
        <Link 
          to="/calculator" 
          className="glass px-8 py-4 text-white rounded-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300 border border-white/10 shadow-lg glow-subtle text-lg font-medium hover:border-white/20 hover:shadow-xl inline-flex items-center gap-2"
        >
          Start Calculating
          <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Why Use Our Calculator?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-6 rounded-xl hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <ChartBarIcon className="h-8 w-8 text-white" />
              <h3 className="text-xl font-semibold text-white">Instant Accuracy</h3>
            </div>
            <p className="text-gray-300">
              Get precise probability calculations in seconds, without complex math.
            </p>
          </div>
          <div className="glass p-6 rounded-xl hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <SparklesIcon className="h-8 w-8 text-white" />
              <h3 className="text-xl font-semibold text-white">Intuitive Interface</h3>
            </div>
            <p className="text-gray-300">
              A simple and elegant interface that lets you focus on your game rather than calculations.
            </p>
          </div>
          <div className="glass p-6 rounded-xl hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <AcademicCapIcon className="h-8 w-8 text-white" />
              <h3 className="text-xl font-semibold text-white">Continuous Learning</h3>
            </div>
            <p className="text-gray-300">
              Better understand poker probabilities through our glossary and tutorials.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass p-4 rounded-xl text-center hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group">
            <div className="flex justify-center mb-2">
              <PlayIcon className="h-8 w-8 text-white group-hover:text-gray-300 transition-colors" />
            </div>
            <p className="text-gray-300 group-hover:text-white transition-colors">Select your cards</p>
          </div>
          <div className="glass p-4 rounded-xl text-center hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group">
            <div className="flex justify-center mb-2">
              <ArrowPathIcon className="h-8 w-8 text-white group-hover:text-gray-300 transition-colors" />
            </div>
            <p className="text-gray-300 group-hover:text-white transition-colors">Add board cards</p>
          </div>
          <div className="glass p-4 rounded-xl text-center hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group">
            <div className="flex justify-center mb-2">
              <CalculatorIcon className="h-8 w-8 text-white group-hover:text-gray-300 transition-colors" />
            </div>
            <p className="text-gray-300 group-hover:text-white transition-colors">Get probabilities</p>
          </div>
          <div className="glass p-4 rounded-xl text-center hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group">
            <div className="flex justify-center mb-2">
              <ArrowTrendingUpIcon className="h-8 w-8 text-white group-hover:text-gray-300 transition-colors" />
            </div>
            <p className="text-gray-300 group-hover:text-white transition-colors">Make better decisions</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-3xl -z-10"></div>
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Improve Your Game?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Start using our calculator for free right now.
        </p>
        <Link 
          to="/calculator" 
          className="glass px-8 py-4 text-white rounded-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300 border border-white/10 shadow-lg glow-subtle text-lg font-medium hover:border-white/20 hover:shadow-xl inline-flex items-center gap-2"
        >
          Start Free
          <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </section>
    </div>
  );
};

export default Home; 