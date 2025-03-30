import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PokerCalculator from './components/PokerCalculator';
import Footer from './components/Footer';
import PokerSymbols from './components/PokerSymbols';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black">
        
        <PokerSymbols />
        
        <main className="flex-grow container mx-auto px-4 py-8 z-10 animate-fadeIn">
          <Routes>
            <Route path="/" element={<PokerCalculator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
