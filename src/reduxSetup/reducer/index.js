import { combineReducers } from "redux";
import cartReducer from "./cart.js";
export default combineReducers({
    Cart: cartReducer,
})