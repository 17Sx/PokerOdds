import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold text-white mb-6">
          Master Your Poker Probabilities
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover our advanced probability calculator to make more informed decisions at the poker table.
        </p>
        <Link 
          to="/calculator" 
          className="glass px-8 py-4 text-white rounded-lg hover:bg-white/10 transform hover:scale-105 transition-all border border-white/10 shadow-lg glow-subtle text-lg font-medium"
        >
          Start Calculating
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Why Use Our Calculator?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-white mb-4">Instant Accuracy</h3>
            <p className="text-gray-300">
              Get precise probability calculations in seconds, without complex math.
            </p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-white mb-4">Intuitive Interface</h3>
            <p className="text-gray-300">
              A simple and elegant interface that lets you focus on your game rather than calculations.
            </p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-white mb-4">Continuous Learning</h3>
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
          <div className="glass p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-white mb-2">1</div>
            <p className="text-gray-300">Select your cards</p>
          </div>
          <div className="glass p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-white mb-2">2</div>
            <p className="text-gray-300">Add board cards</p>
          </div>
          <div className="glass p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-white mb-2">3</div>
            <p className="text-gray-300">Get probabilities</p>
          </div>
          <div className="glass p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-white mb-2">4</div>
            <p className="text-gray-300">Make better decisions</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Improve Your Game?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Start using our calculator for free right now.
        </p>
        <Link 
          to="/calculator" 
          className="glass px-8 py-4 text-white rounded-lg hover:bg-white/10 transform hover:scale-105 transition-all border border-white/10 shadow-lg glow-subtle text-lg font-medium"
        >
          Start Free
        </Link>
      </section>
    </div>
  );
};

export default Home; 