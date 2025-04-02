import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PokerCalculator from './components/PokerCalculator';
import Glossary from './pages/Glossary';
import Tutorial from './pages/Tutorial';
import Footer from './components/Footer';
import PokerSymbols from './components/PokerSymbols';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black">
        <PokerSymbols />
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8 z-10 animate-fadeIn">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<PokerCalculator />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/tutorial" element={<Tutorial />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
