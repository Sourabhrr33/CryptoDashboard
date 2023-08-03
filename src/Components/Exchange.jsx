import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Exchange = () => {
  //getting the state from the central redux store
  const { coins, isLoading, isError, isSuccess, message }= useSelector((state)=>state.coins)

  //setting the loading state
  const [loading, setLoading] = useState(true)

  //changing the loading state 
  useEffect(() =>{
    setLoading(prevState=>!prevState)
  }, [coins, isLoading])
  return (
    <div className="bg-white my-6 p-6 rounded-md">
      <div>
        <h1 className="text-xl font-bold">Exchange Coins</h1>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-around">
          <h4 className="text-orange-600 font-semibold text-xl" >Sell</h4>
          {loading?<h1>Loading</h1>:(<select 
            name="currency"
            className="bg-slate-100 w-20 h-8 text-center text-lg font-semibold rounded-md list-item">
              <option>INR</option>
              <option>USD</option>
            {coins?.map((coin)=>(
              <option id="blah" key={coin.id} value={coin.id} className="text-center text-lg">{coin.name}</option>
            ))}
          </select>)}
          <h3 className="text-orange-500">$2300</h3>
        </div>
        <div className="flex justify-around pt-4">
          <h4 className="text-green-600 font-semibold text-xl">Buy</h4>
          {loading?<h1>Loading</h1>:(<select 
            name="currency"
            className="bg-slate-100 w-20 h-8 text-center text-lg font-semibold rounded-md list-item">
              <option>INR</option>
              <option>USD</option>
            {coins?.map((coin)=>(
              <option id="blah" key={coin.id} value={coin.id} className="text-center text-lg">{coin.name}</option>
            ))}
          </select>)}
          <h2 className="text-green-400">$2300</h2>
        </div>
        <div className="flex justify-center pt-8">
          <button className="bg-blue-600 py-2 px-3 rounded-md">Exchange</button>
        </div>
      </div>
    </div>
  )
}

export default Exchange