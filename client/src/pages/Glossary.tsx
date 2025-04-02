import React, { useState } from 'react';

interface Term {
  term: string;
  definition: string;
  category: string;
}

const terms: Term[] = [
  {
    term: "Outs",
    definition: "The remaining cards that can improve your hand. For example, if you have four cards of the same suit, you have 9 outs to make a flush.",
    category: "Probabilities"
  },
  {
    term: "Pot Odds",
    definition: "The ratio between the amount to call and the total amount in the pot. Used to determine if a call is profitable.",
    category: "Probabilities"
  },
  {
    term: "Implied Odds",
    definition: "Probabilities that take into account potential future winnings, not just the current pot.",
    category: "Probabilities"
  },
  {
    term: "Flop",
    definition: "The first three community cards revealed in the center of the table.",
    category: "Basic Terms"
  },
  {
    term: "Turn",
    definition: "The fourth community card revealed after the flop.",
    category: "Basic Terms"
  },
  {
    term: "River",
    definition: "The final community card revealed after the turn.",
    category: "Basic Terms"
  },
  {
    term: "Preflop",
    definition: "The phase of the game before community cards are revealed.",
    category: "Basic Terms"
  },
  {
    term: "Postflop",
    definition: "The phase of the game after community cards have been revealed.",
    category: "Basic Terms"
  }
];

const Glossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(terms.map(term => term.category)))];

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        Poker Glossary
      </h1>

      {/* Search and Filter */}
      <div className="glass p-6 rounded-xl mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search for a term..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTerms.map((term, index) => (
          <div key={index} className="glass p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-white">{term.term}</h3>
              <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-white">
                {term.category}
              </span>
            </div>
            <p className="text-gray-300">{term.definition}</p>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          No terms found for your search.
        </div>
      )}
    </div>
  );
};

export default Glossary; 