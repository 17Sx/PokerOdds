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
      <div className="glass p-8 rounded-xl shadow-lg backdrop-blur-md animate-pulse glow-subtle">
        <div className="h-6 bg-white/5 rounded-xl mb-4 w-1/2 mx-auto"></div>
        <div className="h-4 bg-white/5 rounded-xl mb-2 w-full"></div>
        <div className="h-4 bg-white/5 rounded-xl mb-2 w-3/4 mx-auto"></div>
        <div className="h-4 bg-white/5 rounded-xl mb-2 w-5/6 mx-auto"></div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="glass p-8 rounded-xl shadow-lg backdrop-blur-md glow-subtle">
        <p className="text-white/70 text-center font-light text-lg">
          Select your cards to see probabilities
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4 mx-auto">
          Results
        </h3>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Win Card */}
          <div className="glass-card flex-1 p-6 rounded-xl bg-white/5 hover:bg-white/10 flex flex-col items-center min-h-[150px] justify-center text-center">
            <h4 className="text-sm font-medium text-white/70 mb-3 uppercase tracking-wider">Win</h4>
            <div className="w-full text-center overflow-hidden px-2">
              <p className="text-2xl font-bold text-white whitespace-normal break-words">{results.winProbability}%</p>
            </div>
          </div>
          
          {/* Tie Card */}
          <div className="glass-card flex-1 p-6 rounded-xl bg-white/5 hover:bg-white/10 flex flex-col items-center min-h-[150px] justify-center text-center">
            <h4 className="text-sm font-medium text-white/70 mb-3 uppercase tracking-wider">Tie</h4>
            <div className="w-full text-center overflow-hidden px-2">
              <p className="text-2xl font-bold text-white whitespace-normal break-words">{results.tieProbability}%</p>
            </div>
          </div>
          
          {/* Loss Card */}
          <div className="glass-card flex-1 p-6 rounded-xl bg-white/5 hover:bg-white/10 flex flex-col items-center min-h-[150px] justify-center text-center">
            <h4 className="text-sm font-medium text-white/70 mb-3 uppercase tracking-wider">Loss</h4>
            <div className="w-full text-center overflow-hidden px-2">
              <p className="text-2xl font-bold text-white whitespace-normal break-words">{results.lossProbability}%</p>
            </div>
          </div>
        </div>
      </div>
      
      {results.currentHand && (
        <div className="mb-8 glass-card p-5 rounded-xl bg-white/5 hover:bg-white/10 text-center">
          <h4 className="text-sm font-medium text-white/70 mb-3 uppercase tracking-wider">Current Hand</h4>
          <p className="text-xl font-medium text-white">{results.currentHand}</p>
        </div>
      )}
      
      {results.outs && results.outs.length > 0 && (
        <div className="glass-card p-5 rounded-xl bg-white/5 hover:bg-white/10 text-center">
          <h4 className="text-sm font-medium text-white/70 mb-3 uppercase tracking-wider">Outs</h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {results.outs.map((out, index) => (
              <span 
                key={index} 
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm
                border border-white/5 shadow-lg"
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