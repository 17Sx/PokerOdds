import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PokerCalculator from './components/PokerCalculator';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black bg-fixed">
        <div className="fixed inset-0 z-0 bg-[url('/poker-bg.jpg')] bg-center bg-cover bg-no-repeat opacity-5"></div>
        <div className="fixed inset-0 z-0 bg-black/50"></div>
        
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <Header />
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
