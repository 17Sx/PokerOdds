import React from 'react';

interface PokerSymbol {
  symbol: '♠' | '♥' | '♦' | '♣';
  color: string;
  size: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
}

const PokerSymbols: React.FC = () => {
  const symbols: PokerSymbol[] = [
    { symbol: '♠', color: '#aaaaaa', size: 100, top: '15%', left: '10%', delay: 0, duration: 30 },
    { symbol: '♥', color: '#d64545', size: 150, top: '25%', left: '75%', delay: 5, duration: 35 },
    { symbol: '♦', color: '#d64545', size: 120, top: '65%', left: '15%', delay: 10, duration: 40 },
    { symbol: '♣', color: '#aaaaaa', size: 130, top: '45%', left: '85%', delay: 15, duration: 38 },
    { symbol: '♠', color: '#aaaaaa', size: 200, top: '75%', left: '60%', delay: 2, duration: 25 },
    { symbol: '♥', color: '#d64545', size: 110, top: '10%', left: '40%', delay: 8, duration: 32 },
    { symbol: '♦', color: '#d64545', size: 180, top: '30%', left: '20%', delay: 12, duration: 36 },
    { symbol: '♣', color: '#aaaaaa', size: 140, top: '70%', left: '30%', delay: 18, duration: 28 },
    { symbol: '♠', color: '#aaaaaa', size: 85, top: '55%', left: '70%', delay: 7, duration: 33 },
    { symbol: '♥', color: '#d64545', size: 170, top: '20%', left: '55%', delay: 3, duration: 29 },
    { symbol: '♦', color: '#d64545', size: 125, top: '80%', left: '40%', delay: 14, duration: 34 },
    { symbol: '♣', color: '#aaaaaa', size: 95, top: '35%', left: '5%', delay: 6, duration: 31 },
    { symbol: '♠', color: '#aaaaaa', size: 160, top: '5%', left: '80%', delay: 9, duration: 37 },
    { symbol: '♥', color: '#d64545', size: 130, top: '85%', left: '85%', delay: 11, duration: 42 },
    { symbol: '♦', color: '#d64545', size: 190, top: '50%', left: '50%', delay: 4, duration: 39 },
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {symbols.map((item, index) => (
        <div
          key={index}
          className="absolute animate-float"
          style={{
            top: item.top,
            left: item.left,
            fontSize: `${item.size}px`,
            color: item.color,
            opacity: 0.2,
            animation: `float ${item.duration}s ease-in-out infinite`,
            animationDelay: `${item.delay}s`,
            transformStyle: 'preserve-3d',
            textShadow: '0 0 15px rgba(255, 255, 255, 0.15)',
          }}
        >
          {item.symbol}
        </div>
      ))}
    </div>
  );
};

export default PokerSymbols; 