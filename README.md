# PokerOdds - Poker Probability Calculator

A web application allowing poker players to calculate their hand probabilities in real-time.

## Features

- Simple and intuitive interface
- Calculation of win, tie, and loss probabilities
- Current hand identification
- Real-time calculations using Monte Carlo algorithm
- Responsive design with TailwindCSS

## Architecture

The project is divided into two parts:

- **Frontend**: React application with TailwindCSS
- **Backend**: Node.js/Express server for complex calculations

## Installation

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/17Sx/PokerOdds.git
cd PokerOdds
```

2. **Install backend dependencies**

```bash
cd server
npm install
```

3. **Install frontend dependencies**

```bash
cd ../client
npm install
```

## Getting Started

1. **Start the backend server**

```bash
cd server
npm run dev
```

The server will start on http://localhost:5000

2. **Start the frontend application**

```bash
cd ../client
npm start
```

The application will be accessible at http://localhost:3000

## Usage

1. Select your cards by clicking on empty card slots
2. Add board cards (flop, turn, river) if necessary
3. Instantly view your odds of winning the hand

## Future Development

- Addition of an "automatic reading" mode via OCR or browser extension
- AI-based strategic suggestions
- Support for other poker variants

## License

MIT
