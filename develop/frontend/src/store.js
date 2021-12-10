import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import {
  userSigninReducer,
  userRegisterReducer,
} from "./reducers/userReducers";

import { cartReducer } from "./reducers/cartReducers";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
//

const cartItems = Cookie.get("cartItems") ?  JSON.parse(Cookie.get("cartItems")) : [];
const userInfo =Cookie.get("userInfo")? JSON.parse(Cookie.get("userInfo")) : null;
const initialState = { cart: { cartItems }, userSignin: { userInfo } };
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
