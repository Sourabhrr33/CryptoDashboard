import React, { useEffect, useState } from 'react';
import up from "../asstes/up.png";
import down from "../asstes/Down.png";
import { useDispatch, useSelector } from 'react-redux';

const Coins = () => {
  const { coins, isLoading, isError, isSuccess, message } = useSelector((state) => state.coins);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(prevState => !prevState);
  }, [coins, isLoading]);

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <div className="py-4 px-4">
        <h2 className="text-xl font-bold">Cryptocurrency by Market Cap</h2>
      </div>
      {loading ? (
        <h1 className="text-center text-lg font-bold">Loading...</h1>
      ) : (
        <div className="overflow-y-auto max-h-[148vh] no-scrollbar">
          {coins?.map((coin) => (
            <div key={coin.id} className="flex py-4 border-b-2 border-slate-200 justify-between px-4 items-center">
              <div className="flex items-center">
                <img src={coin.image} alt={coin.name} className="h-8 w-8 rounded-full mx-2" />
                <div>
                  <h3 className="text-xl font-medium">{coin.name}</h3>
                  <h4 className="text-base font-light">Mkt Cap: {coin.market_cap}</h4>
                </div>
              </div>
              <h5 className="text-lg">
                <div className="flex items-center">
                  <img src={coin.price_change_percentage_24h > 0 ? up : down} alt={coin.price_change_percentage_24h > 0 ? "Up" : "Down"} className="w-6" />
                  <span className={coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}>
                    {Math.abs(coin.price_change_percentage_24h)}%
                  </span>
                </div>
              </h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Coins;
