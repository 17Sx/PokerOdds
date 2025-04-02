import React from 'react';

const Tutorial: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        How to Use the Calculator
      </h1>

      {/* Introduction */}
      <section className="glass p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Introduction
        </h2>
        <p className="text-gray-300 mb-4">
          Our poker probability calculator helps you make more informed decisions by quickly calculating your chances of winning in different situations.
        </p>
        <p className="text-gray-300">
          Follow this step-by-step guide to learn how to use our tool effectively.
        </p>
      </section>

      {/* Step 1 */}
      <section className="glass p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Step 1: Select Your Cards
        </h2>
        <p className="text-gray-300 mb-4">
          Start by selecting your starting cards (hole cards). Click on the empty slots in the "Player Hand" section and choose your cards from the selector that appears.
        </p>
        <div className="bg-white/5 p-4 rounded-lg">
          <p className="text-gray-300">
            <span className="font-semibold text-white">Tip:</span> You can select up to two cards for your hand.
          </p>
        </div>
      </section>

      {/* Step 2 */}
      <section className="glass p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Step 2: Add Board Cards
        </h2>
        <p className="text-gray-300 mb-4">
          If you're in a postflop situation, add the community cards that are already on the table. Click on the empty slots in the "Board" section and select the corresponding cards.
        </p>
        <div className="bg-white/5 p-4 rounded-lg">
          <p className="text-gray-300">
            <span className="font-semibold text-white">Note:</span> You can add up to 5 cards on the board (flop + turn + river).
          </p>
        </div>
      </section>

      {/* Step 3 */}
      <section className="glass p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Step 3: Interpret the Results
        </h2>
        <p className="text-gray-300 mb-4">
          Once your cards are selected, the calculator will automatically display:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Your win probability</li>
          <li>Your tie probability</li>
          <li>Your loss probability</li>
          <li>Your current hand</li>
          <li>Your outs (cards that can improve your hand)</li>
        </ul>
      </section>

      {/* Tips */}
      <section className="glass p-6 rounded-xl">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Usage Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">For Preflop</h3>
            <p className="text-gray-300">
              Select only your starting cards to see your base chances.
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">For Postflop</h3>
            <p className="text-gray-300">
              Add board cards for more accurate probability calculations.
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Real-time Usage</h3>
            <p className="text-gray-300">
              The calculator updates automatically when you modify your cards.
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Reset</h3>
            <p className="text-gray-300">
              Use the "Reset" button to start with a new hand.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tutorial; 