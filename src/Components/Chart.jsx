

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinTime, reset } from '../Redux/chart/ChartSlice';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController, // Add the BarController import
  BarElement, // Add the BarElement import
} from 'chart.js';

import { Line, Bar } from 'react-chartjs-2'; // Move this import below the Chart.js imports

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController, // Add the BarController to the registered components
  BarElement // Add the BarElement to the registered components
);

const Chart = () => {
  const dispatch = useDispatch();
  const { coins, isLoading, isError, isSuccess, message } = useSelector((state) => state.coins);
  const { coinTime } = useSelector((state) => state.coinTime);
  //const [coinChartData, setCoinChartData]=useState(coinTime)
  console.log(coinTime);

  //setting the loading state
  const [loading, setLoading] = useState(true);
  //changing the loading state
  useEffect(() => {
    setLoading((prevState) => !prevState);
  }, [coins, isLoading]);

  const [id, setId] = useState('bitcoin');

  const [days, setDays] = useState(30);

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleDays = (e) => {
    setDays(e.target.value);
  };

  // Step 1: Create a state variable for chart type
  const [chartType, setChartType] = useState('line'); // Default to Line Chart

  // Step 2: Add a change handler for the chart type selection dropdown
  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  //dispatching the api to get coins data
  useEffect(() => {
    dispatch(fetchCoinTime({ id, days }));
    return () => {
      dispatch(reset());
    };
  }, [id, dispatch, days]);

  return (
    <div className="bg-white rounded-md p-4">
      <div className="py-4 px-4">
        <h2 className="text-xl font-bold">Cryptocurrency by Market Cap</h2>
      </div>
      {loading ? (
        <h1 className="text-center text-lg font-bold">Loading...</h1>
      ) : (
        <div>
          <div className="flex justify-between">
            <div className="w-full flex flex-col md:flex-row justify-around md:items-center">
              <div className="flex items-center mb-2 md:mb-0">
                <button value={1} onClick={handleDays} className="bg-slate-300 px-2 py-1 rounded-md">
                  1D
                </button>
                <button value={7} onClick={handleDays} className="bg-slate-300 px-2 py-1 rounded-md mx-1">
                  1W
                </button>
                <button value={30} onClick={handleDays} className="bg-slate-300 px-2 py-1 rounded-md mx-1">
                 1M
               </button>
               <button value={90} onClick={handleDays} className="bg-slate-300 px-2 py-1 rounded-md mx-1">
                  3M
                </button>
               <button value={365} onClick={handleDays} className="bg-slate-300 px-2 py-1 rounded-md mx-1">
                  1Y
               </button>
              
              </div>
              <div className="md:ml-4 md:flex-grow">
                <select
                  name="currency"
                  onChange={handleChange}
                  value={id}
                  className="bg-slate-100 w-full md:w-40 h-8 text-center text-lg font-semibold rounded-md list-item"
                >
                  {coins?.map((coin) => (
                    <option key={coin.id} value={coin.id} className="text-center text-lg">
                      {coin.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sr md:ml-4">
                {/* Step 3: Chart type selection dropdown */}
                <select
                  onChange={handleChartTypeChange}
                  value={chartType}
                  className="bg-slate-100 w-full md:w-40 h-8 text-center text-lg font-semibold rounded-md list-item"
                >
                  <option value="line">Line Chart</option>
                  <option value="bar">Bar Chart</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ paddingTop: '16px' }}>
            {/* Step 4: Conditionally render the selected chart type */}
            {chartType === 'line' ? (
              <Line
                height={400}
                data={{
                  labels: coinTime?.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.getUTCFullYear();
                  }),
                  datasets: [
                    {
                      data: coinTime?.map((coin) => coin[1]),
                      pointRadius: 0,
                      label: `${id.toUpperCase()} Market Price`,
                      borderColor: '#328213',
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                      labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                      },
                    },
                    title: {
                      display: true,
                      text: `${id.toUpperCase()}`,
                      padding: {
                        bottom: 30,
                      },
                      weight: 'bold',
                      color: '#00325c',
                      font: {
                        size: 13,
                      },
                      align: 'end',
                    },
                    datalabels: {
                      display: false,
                      labels: {
                        title: {
                          font: {
                            weight: 'bold',
                            size: 18,
                          },
                        },
                      },
                    },
                  },
                }}
              />
            ) : (
              <Bar
                height={400}
                data={{
                  labels: coinTime?.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.getUTCFullYear();
                  }),
                  datasets: [
                    {
                      data: coinTime?.map((coin) => coin[1]),
                      label: `${id.toUpperCase()} Market Price`,
                      backgroundColor: '#328213',
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                      labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                      },
                    },
                    title: {
                      display: true,
                      text: `${id.toUpperCase()}`,
                      padding: {
                        bottom: 30,
                      },
                      weight: 'bold',
                      color: '#00325c',
                      font: {
                        size: 13,
                      },
                      align: 'end',
                    },
                    datalabels: {
                      display: false,
                      labels: {
                        title: {
                          font: {
                            weight: 'bold',
                            size: 18,
                          },
                        },
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;









// import React, { useEffect, useState } from 'react'
// import { Line } from 'react-chartjs-2'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchCoinTime, reset } from '../Redux/chart/ChartSlice'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   ArcElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// ChartJS.register(
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Chart = () => {

//   const dispatch=useDispatch()
//   const { coins, isLoading, isError, isSuccess, message }= useSelector((state)=>state.coins)
//   const {coinTime} =useSelector(state=>state.coinTime)
//   //const [coinChartData, setCoinChartData]=useState(coinTime)
//   console.log(coinTime)

//   //setting the loading state
//   const [loading, setLoading] = useState(true)
//   //changing the loading state
//   useEffect(() =>{
//     setLoading(prevState=>!prevState)
//   }, [coins, isLoading])

//   const [id, setId]=useState("bitcoin")

//   const [days, setDays]=useState(30)

//   const handleChange = (e) => {
//     setId(e.target.value)
//   }


//   const handleDays = (e)=>{
//     setDays(e.target.value)
//   }

//   //dispatching the api to get coins data
//   useEffect(() => {
//     dispatch(fetchCoinTime({id,days}));
//   return ()=>{
//       dispatch(reset())
//     }
//   }, [id,dispatch, days]);

//   return (
//     <div className="bg-white rounded-md p-4">
//       <div className="py-4 px-4">
//         <h2 className="text-xl font-bold">Cryptocurrency by Market Cap</h2>
//       </div>
//       {loading ? (
//         <h1 className="text-center text-lg font-bold">Loading...</h1>
//       ) : (
//         <div>
//           <div className="flex justify-between">
//             <div className="w-full flex flex-col md:flex-row justify-around md:items-center">
//               <div className="flex items-center mb-2 md:mb-0">
//                 <button value={1} onClick={handleDays} className="bg-slate-300 px-2 py-1 rounded-md">
//                   1D
//                 </button>
//                 <button value={7} onClick={handleDays} className="bg-slate-300 px-2 py-1 rounded-md mx-1">
//                   1W
//                 </button>
//                 <button value={30} onClick={handleDays} className="bg-slate-300 px-2 py-1 rounded-md mx-1">
//                   1M
//                 </button>
//                 <button value={90} onClick={handleDays} className="bg-slate-300 px-2 py-1 rounded-md mx-1">
//                   3M
//                 </button>
//                 <button value={365} onClick={handleDays} className="bg-slate-300 px-2 py-1 rounded-md mx-1">
//                   1Y
//                 </button>
//               </div>
//               <div className="md:ml-4 md:flex-grow">
//                 <select
//                   name="currency"
//                   onChange={handleChange}
//                   value={id}
//                   className="bg-slate-100 w-full md:w-40 h-8 text-center text-lg font-semibold rounded-md list-item"
//                 >
//                   {coins?.map((coin) => (
//                     <option key={coin.id} value={coin.id} className="text-center text-lg">
//                       {coin.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="sr md:ml-4 ">
//                 <select className="bg-slate-100 w-full md:w-40 h-8 text-center text-lg font-semibold rounded-md list-item">
//                   <option>Line Chart</option>
//                   <option>Bar Chart</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div style={{ paddingTop: '16px' }}>
//             <Line
//               height={400}
//               data={{
//                 labels: coinTime?.map((coin) => {
//                   let date = new Date(coin[0]);
//                   let time =
//                     date.getHours() > 12
//                       ? `${date.getHours() - 12}:${date.getMinutes()} PM`
//                       : `${date.getHours()}:${date.getMinutes()} AM`;
//                   return days === 1 ? time : date.getUTCFullYear();
//                 }),

//                 datasets: [
//                   {
//                     data: coinTime?.map((coin) => coin[1]),
//                     pointRadius: 0,
//                     label: `${id.toUpperCase()} Market Price`,
//                     borderColor: '#328213',
//                   },
//                 ],
//               }}
//               options={{
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: {
//                     display: false,
//                     labels: {
//                       usePointStyle: true,
//                       pointStyle: 'circle',
//                       // boxWidth: 5
//                     },
//                   },
//                   title: {
//                     display: true,
//                     text: `${id.toUpperCase()}`,
//                     padding: {
//                       bottom: 30,
//                     },
//                     weight: 'bold',
//                     color: '#00325c',
//                     font: {
//                       size: 13,
//                     },
//                     align: 'end',
//                   },

//                   datalabels: {
//                     display: false,
//                     labels: {
//                       title: {
//                         font: {
//                           weight: 'bold',
//                           size: 18,
//                         },
//                       },
//                     },
//                   },
//                 },
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


// export default Chart