import React from 'react';
import ChartComponent from './Components/Chart';
import Coins from './Components/Coin';
import Exchange from './Components/Exchange';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Portfolio from './Components/Portfolio';
import './App.css';

const App = () => {
  return (
    <div className="flex flex-col bg-gray-100">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
            <Navbar />
            <div className="p-4">
              <ChartComponent />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
              <Portfolio />
              <Exchange />
            </div>
          </div>
          <div >
            <Coins />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
