import React, { useState } from 'react';

interface ProbabilityResultsProps {
  results: {
    winProbability: string;
    tieProbability: string;
    lossProbability: string;
    hitProbability: string;
    currentHand?: string | null;
    outs?: string[];
    outDetails?: {
      byType: { [key: string]: number },
      total: number
    };
    opponentImpact?: Array<{
      opponents: number;
      winProbability: string;
    }>;
  } | null;
  loading: boolean;
}

const ProbabilityResults: React.FC<ProbabilityResultsProps> = ({ results, loading }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'opponents' | 'outs'>('basic');

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
    <div className="glass p-8 rounded-xl shadow-lg backdrop-blur-md glow-subtle">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-4 text-white border-b border-white/10 pb-4 mx-auto">
          Results
        </h3>
        
        {/* Onglets de navigation */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white/5 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('basic')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'basic' ? 'bg-white/15 text-white shadow-sm' : 'text-white/70 hover:bg-white/10'
              }`}
            >
              Basic
            </button>
            <button 
              onClick={() => setActiveTab('opponents')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'opponents' ? 'bg-white/15 text-white shadow-sm' : 'text-white/70 hover:bg-white/10'
              }`}
            >
              Opponents
            </button>
            <button 
              onClick={() => setActiveTab('outs')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'outs' ? 'bg-white/15 text-white shadow-sm' : 'text-white/70 hover:bg-white/10'
              }`}
            >
              Outs
            </button>
          </div>
        </div>
      </div>
      
      {/* Contenu de l'onglet Basic */}
      {activeTab === 'basic' && (
        <>
          <div className="mb-6">
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
          
          {/* Probabilité de toucher une main */}
          <div className="mb-6 glass-card p-5 rounded-xl bg-white/5 hover:bg-white/10 text-center">
            <h4 className="text-sm font-medium text-white/70 mb-3 uppercase tracking-wider">Chance to Hit</h4>
            <p className="text-2xl font-bold text-white">{results.hitProbability}%</p>
            <p className="text-xs text-white/60 mt-2">Probability of improving your hand on Turn or River</p>
          </div>
          
          {results.currentHand && (
            <div className="mb-6 glass-card p-5 rounded-xl bg-white/5 hover:bg-white/10 text-center">
              <h4 className="text-sm font-medium text-white/70 mb-3 uppercase tracking-wider">Current Hand</h4>
              <p className="text-xl font-medium text-white">{results.currentHand}</p>
            </div>
          )}
        </>
      )}
      
      {/* Contenu de l'onglet Opponents */}
      {activeTab === 'opponents' && results.opponentImpact && (
        <div className="mb-6 glass-card p-5 rounded-xl bg-white/5 hover:bg-white/10">
          <h4 className="text-sm font-medium text-white/70 mb-5 uppercase tracking-wider text-center">Impact of Number of Opponents</h4>
          
          <div className="space-y-4">
            {results.opponentImpact.sort((a, b) => a.opponents - b.opponents).map((impact) => (
              <div key={impact.opponents} className="flex items-center">
                <div className="w-24 text-white font-medium">
                  {impact.opponents} {impact.opponents === 1 ? 'opponent' : 'opponents'}
                </div>
                <div className="flex-1 bg-white/5 rounded-full h-6 mx-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-400 h-6 rounded-full flex items-center justify-end px-2"
                    style={{ width: `${Math.min(100, Math.max(1, parseFloat(impact.winProbability)))}%` }}
                  >
                    <span className="text-xs font-bold text-white">{impact.winProbability}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-xs text-white/60 mt-4 text-center">Your win probability decreases as the number of opponents increases</p>
        </div>
      )}
      
      {/* Contenu de l'onglet Outs */}
      {activeTab === 'outs' && (
        <>
          {results.outDetails && results.outDetails.total > 0 && (
            <div className="mb-6 glass-card p-5 rounded-xl bg-white/5 hover:bg-white/10">
              <h4 className="text-sm font-medium text-white/70 mb-4 uppercase tracking-wider text-center">Outs by Hand Type</h4>
              
              <div className="space-y-3">
                {Object.entries(results.outDetails.byType).map(([type, count]) => (
                  <div key={type} className="flex items-center">
                    <div className="w-32 text-white font-medium text-sm">
                      {type}
                    </div>
                    <div className="flex-1 bg-white/5 rounded-full h-5 mx-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-5 rounded-full flex items-center justify-end px-2"
                        style={{ width: `${Math.min(100, Math.max(5, (count / results.outDetails!.total) * 100))}%` }}
                      >
                        <span className="text-xs font-bold text-white">{count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <span className="text-sm font-bold text-white bg-white/10 px-3 py-1 rounded-full">
                  Total Outs: {results.outDetails.total}
                </span>
                <p className="text-xs text-white/60 mt-2">The cards that can improve your hand</p>
              </div>
            </div>
          )}
          
          {results.outs && results.outs.length > 0 && (
            <div className="glass-card p-5 rounded-xl bg-white/5 hover:bg-white/10 text-center">
              <h4 className="text-sm font-medium text-white/70 mb-3 uppercase tracking-wider">Detailed Outs</h4>
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
          
          {(!results.outs || results.outs.length === 0) && (
            <div className="glass-card p-5 rounded-xl bg-white/5 hover:bg-white/10 text-center">
              <p className="text-white/70">No outs available or not enough cards to calculate outs</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProbabilityResults; 