import React from 'react';

interface ProbabilityResultsProps {
  results: {
    winProbability: string;
    tieProbability: string;
    lossProbability: string;
    currentHand?: string | null;
    outs?: string[];
  } | null;
  loading: boolean;
}

const ProbabilityResults: React.FC<ProbabilityResultsProps> = ({ results, loading }) => {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-500 text-center">
          Sélectionnez vos cartes pour voir les probabilités
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Résultats</h3>
      
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-green-700 mb-2">Victoire</h4>
            <p className="text-2xl font-bold text-green-800">{results.winProbability}%</p>
          </div>
          
          <div className="bg-yellow-100 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-yellow-700 mb-2">Égalité</h4>
            <p className="text-2xl font-bold text-yellow-800">{results.tieProbability}%</p>
          </div>
          
          <div className="bg-red-100 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-red-700 mb-2">Défaite</h4>
            <p className="text-2xl font-bold text-red-800">{results.lossProbability}%</p>
          </div>
        </div>
      </div>
      
      {results.currentHand && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Main Actuelle</h4>
          <p className="text-lg font-medium">{results.currentHand}</p>
        </div>
      )}
      
      {results.outs && results.outs.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Outs</h4>
          <div className="flex flex-wrap gap-2">
            {results.outs.map((out, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
              >
                {out}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProbabilityResults; 