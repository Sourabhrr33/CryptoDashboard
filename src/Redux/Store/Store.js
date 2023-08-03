import { configureStore } from "@reduxjs/toolkit"
import coinReducer from "../coins/CoinSlice"
import chartReducer from "../chart/ChartSlice"

export const store = configureStore({
    reducer:{
        coins:coinReducer,
        coinTime:chartReducer
    }
})